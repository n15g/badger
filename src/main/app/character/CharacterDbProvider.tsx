import { createContext, FC, ReactNode, use, useCallback, useEffect, useMemo, useState } from 'react'
import { Character } from './character.ts'
import BadgerDbProvider from '../db/BadgerDbProvider.tsx'
import { Draft, produce } from 'immer'
import LoadingScreen from '../util/LoadingScreen.tsx'

interface CharacterDbContextValue {
  loading: boolean,
  characters: Character[],
  refreshCharacters: () => Promise<void>,
  createCharacter: (character: Character) => Promise<void>,
  mutateCharacter: (key: string, recipe: (draft: Draft<Character>) => void) => Promise<void>,
  deleteCharacter: (key: string) => Promise<void>,
  hasBadge: (character: Character, badgeKey: string) => boolean,
}

const CharacterDbContext = createContext<CharacterDbContextValue | undefined>(undefined)

const CharacterDbProvider: FC<{ children: ReactNode }> & { useCharacterDb: () => CharacterDbContextValue } =
  ({ children }) => {
    const db = BadgerDbProvider.useBadgerDb()

    const [characters, setCharacters] = useState<Character[] | undefined>()

    const refreshCharacters = useCallback(async () => {
      setCharacters(await db.getCharacters())
    }, [db])

    const createCharacter = useCallback(async (character: Character): Promise<void> => {
      await db.saveCharacter(character)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const mutateCharacter = useCallback(async (key: string, recipe: (draft: Draft<Character>) => void): Promise<void> => {
      const current = await db.getCharacter(key)
      if (!current) {
        throw new Error(`Attempted to mutate character with unknown key [${key}]. Has it been deleted recently?`)
      }
      const next = produce(current, recipe)
      await db.saveCharacter(next)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const deleteCharacter = useCallback(async (key: string): Promise<void> => {
      await db.deleteCharacter(key)
      await refreshCharacters()
    }, [db, refreshCharacters])

    const hasBadge = useCallback((character: Character, badgeKey: string): boolean => {
      return character.badges?.[badgeKey]?.owned ?? false
    }, [])

    useEffect(() => {
      void refreshCharacters()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = useMemo(() => {
      return {
        characters,
        refreshCharacters,
        createCharacter,
        mutateCharacter,
        deleteCharacter,
        hasBadge
      } as CharacterDbContextValue
    }, [characters, refreshCharacters, createCharacter, mutateCharacter, deleteCharacter, hasBadge])

    return (<>
      {!characters
        ? <LoadingScreen text={'Initializing IndexedDB...'}/>
        : (
          <CharacterDbContext value={value}>
            {children}
          </CharacterDbContext>
        )
      }
    </>)
  }

CharacterDbProvider.useCharacterDb = (): CharacterDbContextValue => {
  const context = use(CharacterDbContext)
  if (!context) {
    throw new Error('useCharacterDb must be used within a CharacterDbProvider')
  }
  return context
}

export default CharacterDbProvider
