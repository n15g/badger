import { createContext, FC, ReactNode, use, useMemo } from 'react'
import { Character } from './character.ts'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Badge, BadgeRequirement } from 'coh-content-db'

interface ContextValue {
  character?: Character,
  hasBadge: (badge: Badge) => boolean,
  collectBadge: (badge: Badge | Badge[], owned?: boolean) => Promise<void>,
  hasRequirement: (badge: Badge, requirement: BadgeRequirement) => boolean,
  getRequirementCount: (badge: Badge, requirement: BadgeRequirement) => number,
  updateRequirement: (badge: Badge, requirement: BadgeRequirement, next?: { owned?: boolean, count?: number }) => Promise<void>,
}

const Context = createContext<ContextValue | undefined>(undefined)

const CharacterContextProvider: FC<{ character?: Character, children: ReactNode }> & { useCharacterContext: () => ContextValue } =
  ({ character, children }) => {
    const characterDb = CharacterDbProvider.useCharacterDb()

    const value = useMemo(() => {
      return {
        character,
        hasBadge: (badge: Badge) => character ? characterDb.hasBadge(character, badge) : false,
        collectBadge: async (badge: Badge | Badge[], owned?: boolean) => {
          if (character) {
            await characterDb.collectBadge(character, badge, owned)
          }
        },
        hasRequirement: (badge: Badge, requirement: BadgeRequirement) => {
          return character ? characterDb.hasRequirement(character, badge, requirement) : false
        },
        getRequirementCount: (badge: Badge, requirement: BadgeRequirement) => {
          return character ? characterDb.getRequirementCount(character, badge, requirement) : 0
        },
        updateRequirement: async (badge: Badge, requirement: BadgeRequirement, next?: { owned?: boolean, count?: number }) => {
          if (character) {
            await characterDb.updateRequirement(character, badge, requirement, next)
          }
        }
      }
    }, [character, characterDb])

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
