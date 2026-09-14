import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { Draft, produce } from 'immer'
import LoadingScreen from '../util/LoadingScreen.tsx'
import { Badge, BadgeRequirement } from 'coh-content-db'
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
  getRequirementProgress: (character: Character, badge: Badge) => { percent: number, current: number, total: number },
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
        draft.badges ??= {}
        for (const selectedBadge of Array.isArray(badge) ? badge : [badge]) {
          const record = draft.badges[selectedBadge.key] ??= {}
          record.owned = owned
        }
      })
    }, [mutateCharacter])

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

    const getRequirementProgress = useCallback((character: Character, badge: Badge): {
      percent: number,
      current: number,
      total: number
    } => {
      let total = 0
      let current = 0
      badge.requirements.forEach((requirement) => {
        if (requirement.count) {
          total += requirement.count
          current += getRequirementCount(character, badge, requirement)
        } else {
          total += 1
          current += hasRequirement(character, badge, requirement) ? 1 : 0
        }
      })

      return {
        percent: Math.ceil(current / total * 100),
        current,
        total
      }
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
      })
    }, [content, collectBadge, mutateCharacter])

    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

export default CharacterDbProvider
