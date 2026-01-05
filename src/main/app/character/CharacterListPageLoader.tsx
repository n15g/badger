import CharacterListPage from './CharacterListPage.tsx'
import CharacterDbProvider from './CharacterDbProvider.tsx'

function CharacterListPageLoader() {
  const { characters } = CharacterDbProvider.useCharacterDb()

  return <CharacterListPage characters={characters}/>
}

export default CharacterListPageLoader
