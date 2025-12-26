import CharacterList from './CharacterList.tsx'
import CharacterDbProvider from './CharacterDbProvider.tsx'

function CharacterListLoader() {
  const { characters } = CharacterDbProvider.useCharacterDb()

  return <CharacterList characters={characters}/>
}

export default CharacterListLoader
