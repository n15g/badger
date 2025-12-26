import { DBSchema } from 'idb'
import { Character } from '../character/character.ts'

export interface BadgerDbSchema extends DBSchema {
  'kv-store': {
    key: string
    value: {
      key: string,
      value: unknown
    }
  },
  'characters': {
    key: string
    value: Character
  }
}
