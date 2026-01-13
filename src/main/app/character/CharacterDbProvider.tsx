import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { Draft, produce } from 'immer'
import LoadingScreen from '../util/LoadingScreen.tsx'
import { Badge, BadgeRequirement } from 'coh-content-db'

interface CharacterDbContextValue {
  loading: boolean,
  characters: Character[],
  refreshCharacters: () => Promise<void>,
  createCharacter: (character: Character) => Promise<void>,
  mutateCharacter: (key: string, recipe: (draft: Draft<Character>) => void) => Promise<void>,
  deleteCharacter: (key: string) => Promise<void>,
  hasBadge: (character: Character, badge: Badge) => boolean,
  collectBadge: (character: Character, badge: Badge, owned?: boolean) => Promise<void>,
  hasRequirement: (character: Character, badge: Badge, requirement: BadgeRequirement) => boolean,
  getRequirementCount: (character: Character, badge: Badge, requirement: BadgeRequirement) => number,
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
      return character.badges?.[badge.key]?.owned ?? false
    }, [])

    const collectBadge = useCallback(async (character: Character, badge: Badge, owned = true): Promise<void> => {
      await mutateCharacter(character.key, draft => {
        draft.badges ??= {}
        const existing = draft.badges[badge.key]
        draft.badges[badge.key] = existing ? { ...existing, owned } : { owned }
      })
    }, [mutateCharacter])

    const hasRequirement = useCallback((character: Character, badge: Badge, requirement: BadgeRequirement): boolean => {
      return (character.badges?.[badge.key]?.owned ?? false)
        || (character.badges?.[badge.key]?.req?.[requirement.key]?.owned ?? false)
    }, [])

    const getRequirementCount = useCallback((character: Character, badge: Badge, requirement: BadgeRequirement): number => {
      return character.badges?.[badge.key]?.req?.[requirement.key]?.count ?? 0
    }, [])

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

        // Set badge to owned if all requirements are met
        const unmetRequirement = !!badge.requirements.find((requirement) => {
          return !draftBadge.req?.[requirement.key]?.owned
        })
        draftBadge.owned = !unmetRequirement
      })
    }, [mutateCharacter])

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

export default CharacterDbProvider
