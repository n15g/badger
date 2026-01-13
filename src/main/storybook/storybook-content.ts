import { CohContentDatabase } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'
import { Character } from '../app/character/character.ts'

export const STORYBOOK_CONTENT = new CohContentDatabase(HOMECOMING)

export const TEST_CHARACTERS: Character[] = [
  { key: 'test1', name: 'My Character', server: 'Torchbearer', morality: 'rogue', archetypeKey: 'mastermind' },
  { key: 'test2', name: 'A Character with a Really Long Name', server: 'Everlasting', morality: 'hero', archetypeKey: 'controller' },
  { key: 'test3', name: 'Somebody Else', server: 'Indomitable', morality: 'resistance', archetypeKey: 'sentinel' },
]
