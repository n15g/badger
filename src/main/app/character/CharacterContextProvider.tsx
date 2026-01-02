import { createContext, FC, ReactNode, use } from 'react'
import { Character } from './character.ts'

interface ContextValue {
  character?: Character
}

const Context = createContext<ContextValue | undefined>(undefined)

const CharacterContextProvider: FC<{ character?: Character, children: ReactNode }> & { useCharacterContext: () => ContextValue } =
  ({ character, children }) => {

    return (
      <Context value={{ character }}>
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
