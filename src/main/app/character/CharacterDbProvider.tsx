import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { Draft, produce } from 'immer'
import LoadingScreen from '../util/LoadingScreen.tsx'
import { Badge, BadgeRequirement, CohContentDatabase } from 'coh-content-db'
import ContentProvider from '../content/ContentProvider.tsx'

interface CharacterDbContextValue {
  loading: boolean,
  characters: Character[],
  refreshCharacters: () => Promise<void>,
  createCharacter: (character: Character) => Promise<void>,
  mutateCharacter: (key: string, recipe: (draft: Draft<Character>) => void) => Promise<void>,
  deleteCharacter: (key: string) => Promise<void>,
  hasBadge: (character: Character, badge: Badge) => boolean,
  collectBadge: (character: Character, badge: Badge | Badge[], owned?: boolean) => Promise<void>,
  hasRequirement: (character: Character, badge: Badge, requirement: BadgeRequirement) => boolean,
  getRequirementCount: (character: Character, badge: Badge, requirement: BadgeRequirement) => number,
  getRequirementProgress: (character: Character, badge: Badge) => number,
  updateRequirement: (
    character: Character,
    badge: Badge,
    requirement: BadgeRequirement,
    next?: {
      owned?: boolean, count?: number
    }) => Promise<void>,
}

const CharacterDbContext = createContext<CharacterDbContextValue | undefined>(undefined)

const CharacterDbProvider: FC<{ children: ReactNode }> & { useCharacterDb: () => CharacterDbContextValue } =
  ({ children }) => {
    const db = BadgerDbProvider.useBadgerDb()
    const content = ContentProvider.useContent()

    const [characters, setCharacters] = useState<Character[] | undefined>()

    const refreshCharacters = useCallback(async () => {
      setCharacters(await db.getCharacters())
    }, [db])

    const createCharacter = useCallback(async (character: Character): Promise<void> => {
      await db.saveCharacter(character)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const mutateCharacter = useCallback(async (key: string, recipe: (draft: Draft<Character>) => void): Promise<void> => {
      const current = await db.getCharacter(key)
      if (!current) {
        throw new Error(`Attempted to mutate character with unknown key [${key}]. Has it been deleted recently?`)
      }
      const next = produce(current, recipe)
      await db.saveCharacter(next)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const deleteCharacter = useCallback(async (key: string): Promise<void> => {
      await db.deleteCharacter(key)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const hasBadge = useCallback((character: Character, badge: Badge): boolean => {
      return _hasBadge(character, badge.key)
    }, [])

    const collectBadge = useCallback(async (character: Character, badge: Badge | Badge[], owned = true): Promise<void> => {
      await mutateCharacter(character.key, draft => {
        _collectBadge(draft, content, badge, owned)
      })
    }, [content, mutateCharacter])

    const hasRequirement = useCallback((character: Character, badge: Badge, requirement: BadgeRequirement): boolean => {
      if (requirement.type === 'badge' && requirement.badgeKey) {
        return _hasBadge(character, requirement.badgeKey)
      }
      return (character.badges?.[badge.key]?.owned ?? false)
        || (character.badges?.[badge.key]?.req?.[requirement.key]?.owned ?? false)
    }, [])

    const getRequirementCount = useCallback((character: Character, badge: Badge, requirement: BadgeRequirement): number => {
      return character.badges?.[badge.key]?.req?.[requirement.key]?.count ?? 0
    }, [])

    const getRequirementProgress = useCallback((character: Character, badge: Badge): number => {
      let max = 0
      let cur = 0
      badge.requirements.forEach((requirement) => {
        if (requirement.count) {
          max += requirement.count
          cur += getRequirementCount(character, badge, requirement)
        } else {
          max += 1
          cur += hasRequirement(character, badge, requirement) ? 1 : 0
        }
      })

      return cur / max
    }, [getRequirementCount, hasRequirement])

    const updateRequirement = useCallback(async (
      character: Character,
      badge: Badge,
      requirement: BadgeRequirement,
      next?: {
        owned?: boolean,
        count?: number
      }): Promise<void> => {

      const badgeKey = badge.key
      const reqKey = requirement.key

      if (requirement.type === 'badge' && requirement.badgeKey) {
        const reqBadge = content.getBadge(requirement.badgeKey)
        if (reqBadge) {
          await collectBadge(character, reqBadge, next?.owned)
        }
      }

      await mutateCharacter(character.key, draft => {
        const badgeReq = badge.requirements.find(x => x.key === reqKey)

        draft.badges ??= {}
        draft.badges[badgeKey] ??= {}
        const draftBadge = draft.badges[badgeKey]

        draftBadge.req ??= {}
        draftBadge.req[reqKey] ??= {}
        const draftReq = draftBadge.req[reqKey]

        if (next?.owned !== undefined) {
          draftReq.owned = next.owned
          if (draftReq.owned) {
            draftReq.count = badgeReq?.count
          }
        }

        if (next?.count !== undefined) {
          draftReq.count = next.count

          // Set owned if the count is met
          if (badgeReq?.count) {
            draftReq.owned = badgeReq.count <= (draftReq.count ?? 0)
          }
        }

        _collectBadgeIfRequirementsAreMet(draft, content, badge)
      })
    }, [content, collectBadge, mutateCharacter])

    useEffect(() => {
      void refreshCharacters()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = useMemo(() => {
      return {
        characters,
        refreshCharacters,
        createCharacter,
        mutateCharacter,
        deleteCharacter,
        hasBadge,
        collectBadge,
        hasRequirement,
        getRequirementCount,
        getRequirementProgress,
        updateRequirement,
      } as CharacterDbContextValue
    }, [
      characters,
      refreshCharacters,
      createCharacter,
      mutateCharacter,
      deleteCharacter,
      hasBadge,
      collectBadge,
      hasRequirement,
      getRequirementCount,
      getRequirementProgress,
      updateRequirement
    ])

    return (<>
      {!characters
        ? <LoadingScreen text={'Initializing IndexedDB...'}/>
        : (
          <CharacterDbContext value={value}>
            {children}
          </CharacterDbContext>
        )
      }
    </>)
  }

CharacterDbProvider.useCharacterDb = (): CharacterDbContextValue => {
  const context = use(CharacterDbContext)
  if (!context) {
    throw new Error('useCharacterDb must be used within a CharacterDbProvider')
  }
  return context
}

function _hasBadge(character: Partial<Character>, badgeKey?: string) {
  return badgeKey
    ? character.badges?.[badgeKey]?.owned ?? false
    : false
}

function _collectBadge(
  draft: Draft<Character>,
  content: CohContentDatabase,
  badges: Badge | Badge[],
  owned: boolean,
  ignoreKeys?: string[]
) {
  badges = Array.isArray(badges) ? badges : [badges]

  draft.badges ??= {}
  for (const badge of badges) {
    if (ignoreKeys?.includes(badge.key)) {
      continue
    }

    const existing = draft.badges[badge.key]
    draft.badges[badge.key] = existing ? { ...existing, owned } : { owned }

    ignoreKeys = [...ignoreKeys ?? [], badge.key]
    _collectBadgesThatRequireThisBadge(draft, content, badge, ignoreKeys)
  }
}

/**
 * Scan the draft looking for badges that may now be complete/incomplete (Accolades, Gladiator, etc.) because the given badge owned state has changed.
 * @param draft The draft
 * @param content ContentDB so we know what badges there are available.
 * @param badge The changed badge.
 * @param ignoreKeys Ignore list for visited badges to prevent a re-entrant cyclic dependency cascade of doom.
 */
function _collectBadgesThatRequireThisBadge(draft: Draft<Character>,
                                            content: CohContentDatabase,
                                            badge: Badge,
                                            ignoreKeys?: string[]) {
  content.badges.forEach((contentBadge) => {
    if (contentBadge.requirements.some((req) => req.type === 'badge' && req.badgeKey === badge.key)) {
      _collectBadgeIfRequirementsAreMet(draft, content, contentBadge, ignoreKeys)
    }
  })
}

function _collectBadgeIfRequirementsAreMet(draft: Draft<Character>, content: CohContentDatabase, badge: Badge, ignoreKeys?: string[]) {
  draft.badges ??= {}
  const draftBadge = draft.badges[badge.key] ??= {}

  const owned = !badge.requirements.some((requirement) => {
    if (requirement.type === 'badge' && requirement.badgeKey) {
      return !_hasBadge(draft, requirement.badgeKey)
    }
    return !draftBadge.req?.[requirement.key]?.owned
  })

  _collectBadge(draft, content, badge, owned, ignoreKeys)
}

export default CharacterDbProvider
