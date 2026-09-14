import { deleteDB, openDB } from 'idb'
import { BadgerDb } from '../src/app/db/badger-db.ts'
import { BadgerDbSchema } from '../src/app/db/badger-db-schema.ts'
import { TEST_CHARACTERS } from './storybook-content.ts'

// Each story gets real browser persistence without sharing the application's database.
export async function createStorybookDb() {
  const name = `badger-story-${crypto.randomUUID()}`
  const connection = await openDB<BadgerDbSchema>(name, 1, {
    upgrade(db) {
      db.createObjectStore('kv-store', { keyPath: 'key' })
      db.createObjectStore('characters', { keyPath: 'key' })
    },
  })
  const db = new BadgerDb(connection)
  for (const character of TEST_CHARACTERS) {
    await db.saveCharacter(character)
  }
  return {
    db,
    cleanup: async () => {
      connection.close()
      await deleteDB(name)
    },
  }
}
