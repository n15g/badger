import { IDBPDatabase, openDB } from 'idb'
import { BadgerDbSchema } from './badger-db-schema.ts'

const VERSION = 1

let dbInstance: BadgerDb | undefined = undefined

export async function getBadgerDb(): Promise<BadgerDb> {
  if (dbInstance) {
    return dbInstance
  }
  console.info('Connecting IDB...')
  const db = await openDB<BadgerDbSchema>('badger-2', VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('kv-store')) {
        db.createObjectStore('kv-store', { keyPath: 'key' })
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

  async putKv(key: string, value: unknown) {
    await this.db.put('kv-store', { key, value })
  }

  async getKv<T>(key: string): Promise<T | undefined> {
    return (await this.db.get('kv-store', key))?.value as T
  }
}
