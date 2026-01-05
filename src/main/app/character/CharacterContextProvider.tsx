import { createContext, FC, ReactNode, use, useCallback, useMemo } from 'react'
import { Character } from './character.ts'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Badge, BadgeRequirement } from 'coh-content-db'

interface ContextValue {
  character?: Character,
  hasBadge: (badge: Badge) => boolean,
  collectBadge: (badge: Badge, owned?: boolean) => Promise<void>,
  hasRequirement: (badge: Badge, requirement: BadgeRequirement) => boolean,
  getRequirementCount: (badge: Badge, requirement: BadgeRequirement) => number,
  updateRequirement: (badge: Badge, requirement: BadgeRequirement, next?: { owned?: boolean, count?: number }) => Promise<void>,
}

const Context = createContext<ContextValue | undefined>(undefined)

const CharacterContextProvider: FC<{ character?: Character, children: ReactNode }> & { useCharacterContext: () => ContextValue } =
  ({ character, children }) => {
    const characterDb = CharacterDbProvider.useCharacterDb()

    const hasBadge = useCallback((badge: Badge): boolean => {
      return character?.badges?.[badge.key]?.owned ?? false
    }, [character])

    const collectBadge = useCallback(async (badge: Badge, owned = true): Promise<void> => {
      if (character) {
        await characterDb.mutateCharacter(character.key, draft => {
          draft.badges ??= {}
          draft.badges[badge.key] ??= {}
          draft.badges[badge.key].owned = owned
        })
      }
    }, [character, characterDb])

    const hasRequirement = useCallback((badge: Badge, requirement: BadgeRequirement): boolean => {
      return (character?.badges?.[badge.key]?.owned ?? false)
        || (character?.badges?.[badge.key]?.req?.[requirement.key]?.owned ?? false)
    }, [character])

    const getRequirementCount = useCallback((badge: Badge, requirement: BadgeRequirement): number => {
      return character?.badges?.[badge.key]?.req?.[requirement.key]?.count ?? 0
    }, [character])

    const updateRequirement = useCallback(
      async (badge: Badge,
             requirement: BadgeRequirement,
             next?: {
               owned?: boolean,
               count?: number
             }
      ): Promise<void> => {
        const badgeKey = badge.key
        const reqKey = requirement.key
        if (character) {
          await characterDb.mutateCharacter(character.key, draft => {
            draft.badges ??= {}
            draft.badges[badgeKey] ??= {}
            const draftBadge = draft.badges[badgeKey]

            draftBadge.req ??= {}
            draftBadge.req[reqKey] ??= {}
            const draftReq = draftBadge.req[reqKey]

            draftReq.owned = next?.owned ?? draftReq.owned
            draftReq.count = next?.count ?? draftReq.count

            // Set owned if the count is met
            const badgeReq = badge.requirements.find(x => x.key === reqKey)
            if (badgeReq?.count) {
              draftReq.owned = badgeReq.count <= (draftReq.count ?? 0)
            }

            // Set badge to owned if all requirements are met
            const unmetRequirement = !!badge.requirements.find((requirement) => {
              return !draftBadge.req?.[requirement.key]?.owned
            })
            draftBadge.owned = !unmetRequirement
          })
        }
      }, [character, characterDb])

    const value = useMemo(() => {
      return {
        character,
        hasBadge,
        collectBadge,
        hasRequirement,
        getRequirementCount,
        updateRequirement
      }
    }, [character, hasBadge, collectBadge, hasRequirement, getRequirementCount, updateRequirement])

    return (
      <Context value={value}>
        {children}
      </Context>
    )
  }

CharacterContextProvider.useCharacterContext = (): ContextValue => {
  const context = use(Context)
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterContextProvider')
  }
  return context
}

export default CharacterContextProvider
