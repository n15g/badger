import { useParams } from 'react-router'
import Page404 from '../Page404.tsx'
import { FC, ReactNode } from 'react'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { Character } from './character.ts'

const CharacterLoader: FC<{ children: (Character: Character) => ReactNode }> = ({ children }) => {
  const { characters } = CharacterDbProvider.useCharacterDb()
  const params = useParams()

  const character = characters.find((character) => character.key === params.characterKey)

  return !character ? <Page404/> : <>{children(character)}</>
}

export default CharacterLoader
