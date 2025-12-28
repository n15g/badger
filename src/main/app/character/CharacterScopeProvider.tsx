import { createContext, FC, ReactNode, use } from 'react'
import { Character } from './character.ts'

interface CharacterContextValue {
  character?: Character
}

const Context = createContext<CharacterContextValue | undefined>(undefined)

const CharacterScopeProvider: FC<{ character?: Character, children: ReactNode }> & { useCharacterScope: () => CharacterContextValue } =
  ({ character, children }) => {

    return (
      <Context value={{ character }}>
        {children}
      </Context>
    )
  }

CharacterScopeProvider.useCharacterScope = (): CharacterContextValue => {
  const context = use(Context)
  if (!context) {
    throw new Error('useCharacterScope must be used within a CharacterScopeProvider')
  }
  return context
}

export default CharacterScopeProvider
