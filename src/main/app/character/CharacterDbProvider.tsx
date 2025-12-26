import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import ErrorProvider from '../util/ErrorProvider.tsx'

interface CharacterDbContextValue {
  characters: Character[],
  getCharacter: (key: string) => Promise<Character | undefined>,
  saveCharacter: (character: Character) => Promise<void>,
  deleteCharacter: (key: string) => Promise<void>,
}

const CharacterDbContext = createContext<CharacterDbContextValue | undefined>(undefined)

const CharacterDbProvider: FC<{ children: ReactNode }> & { useCharacterDb: () => CharacterDbContextValue } =
  ({ children }) => {
    const db = BadgerDbProvider.useBadgerDb()
    const error = ErrorProvider.useError()

    const [characters, setCharacters] = useState<Character[] | undefined>()

    const refreshCharacters = useCallback(async () => {
      try {
        setCharacters(await db.getCharacters())
      } catch (err: unknown) {
        error(err)
      }
    }, [db, error])

    useEffect(() => {
      void refreshCharacters()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = useMemo(() => {
      return {
        characters,
        getCharacter: (key: string) => db.getCharacter(key),
        saveCharacter: async (character: Character) => {
          await db.saveCharacter(character)
          await refreshCharacters()
        },
        deleteCharacter: async (key: string) => {
          await db.deleteCharacter(key)
          await refreshCharacters()
        }
      } as CharacterDbContextValue
    }, [db, characters, refreshCharacters])

    return (<>
      {characters && (
        <CharacterDbContext value={value}>
          {children}
        </CharacterDbContext>
      )}
    </>)
  }

CharacterDbProvider.useCharacterDb = (): CharacterDbContextValue => {
  const context = use(CharacterDbContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterDbProvider')
  }
  return context
}

export default CharacterDbProvider
