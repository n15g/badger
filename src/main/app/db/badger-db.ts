import { IDBPDatabase, openDB } from 'idb'
import { BadgerDbSchema } from './badger-db-schema.ts'
import { Character } from '../character/character.ts'

const DATABASE_NAME = 'badger-2'
const VERSION = 1

let dbInstance: BadgerDb | undefined = undefined

export async function getBadgerDb(): Promise<BadgerDb> {
  if (dbInstance) {
    return dbInstance
  }
  console.info('Connecting IDB...')
  const db = await openDB<BadgerDbSchema>(DATABASE_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('kv-store')) {
        db.createObjectStore('kv-store', { keyPath: 'key' })
      }
      if (!db.objectStoreNames.contains('characters')) {
        db.createObjectStore('characters', { keyPath: 'key' })
      }
    },
  })
  console.info('Connected')
  dbInstance = new BadgerDb(db)
  return dbInstance
}

export class BadgerDb {
  readonly db: IDBPDatabase<BadgerDbSchema>

  constructor(db: IDBPDatabase<BadgerDbSchema>) {
    this.db = db
  }

  close() {
    this.db.close()
    console.info('Closing IDB')
    dbInstance = undefined
  }

  async putKv(key: string, value: unknown): Promise<void> {
    await this.db.put('kv-store', { key, value })
  }

  async getKv<T>(key: string): Promise<T | undefined> {
    return (await this.db.get<'kv-store'>('kv-store', key))?.value as T
  }

  async getCharacters(): Promise<Character[]> {
    return (await this.db.getAll('characters'))
  }

  async getCharacter(key: string): Promise<Character | undefined> {
    return (await this.db.get('characters', key))
  }

  async saveCharacter(character: Character): Promise<void> {
    await this.db.put('characters', character)
  }

  async deleteCharacter(key: string): Promise<void> {
    await this.db.delete('characters', key)
  }
}
