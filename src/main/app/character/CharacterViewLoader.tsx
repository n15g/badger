import { useParams } from 'react-router'
import CharacterView from './CharacterView.tsx'
import Page404 from '../Page404.tsx'
import CharacterDbProvider from './CharacterDbProvider.tsx'

function CharacterViewLoader() {
  const { characters } = CharacterDbProvider.useCharacterDb()
  const params = useParams()

  const character = characters.find((character) => character.key === params.characterKey)

  return character ? <CharacterView character={character}/> : <Page404/>
}

export default CharacterViewLoader
