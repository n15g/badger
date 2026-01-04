import { createContext, FC, ReactNode, use, useCallback, useMemo } from 'react'
import { Character } from './character.ts'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Badge } from 'coh-content-db'

interface ContextValue {
  character?: Character,
  hasBadge: (badge: Badge | string) => boolean,
  collectBadge: (badge: Badge | string, owned?: boolean) => Promise<void>
}

const Context = createContext<ContextValue | undefined>(undefined)

const CharacterContextProvider: FC<{ character?: Character, children: ReactNode }> & { useCharacterContext: () => ContextValue } =
  ({ character, children }) => {
    const characterDb = CharacterDbProvider.useCharacterDb()

    const hasBadge = useCallback((badge: Badge | string): boolean => {
      const key = typeof badge === 'string' ? badge : badge.key
      return character?.badges?.[key]?.owned ?? false
    }, [character])

    const collectBadge = useCallback(async (badge: Badge | string, owned = true): Promise<void> => {
      const key = typeof badge === 'string' ? badge : badge.key

      if (character) {
        await characterDb.mutateCharacter(character.key, draft => {
          draft.badges ??= {}
          draft.badges[key] ??= {}
          draft.badges[key].owned = owned
        })
      }
    }, [character, characterDb])

    const value = useMemo(() => {
      return {
        character,
        hasBadge,
        collectBadge
      }
    }, [character, hasBadge, collectBadge])

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
