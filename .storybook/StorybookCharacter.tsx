import { ReactNode } from 'react'
import CharacterDbProvider from '../src/app/character/CharacterDbProvider.tsx'
import CharacterContextProvider from '../src/app/character/CharacterContextProvider.tsx'

export default function StorybookCharacter({ characterKey, children }: { characterKey?: string, children: ReactNode }) {
  const { characters } = CharacterDbProvider.useCharacterDb()
  return (
    <CharacterContextProvider character={characters.find(character => character.key === characterKey)}>
      {children}
    </CharacterContextProvider>
  )
}
