import { deleteDB, openDB } from 'idb'
import { BadgerDb } from '../src/app/db/badger-db.ts'
import { BadgerDbSchema } from '../src/app/db/badger-db-schema.ts'
import type { Character } from '../src/app/character/character.ts'

// Each story gets real browser persistence without sharing the application's database.
export async function createStorybookDb(characters: readonly Character[]) {
  const name = `badger-story-${crypto.randomUUID()}`
  const connection = await openDB<BadgerDbSchema>(name, 1, {
    upgrade(db) {
      db.createObjectStore('kv-store', { keyPath: 'key' })
      db.createObjectStore('characters', { keyPath: 'key' })
    },
  })
  const db = new BadgerDb(connection)
  const cleanup = async () => {
    connection.close()
    await deleteDB(name)
  }
  try {
    for (const character of characters) {
      await db.saveCharacter(character)
    }
  } catch (error) {
    await cleanup()
    throw error
  }
  return { db, cleanup }
}

export function getStorybookDb(loaded: Record<string, unknown>): BadgerDb {
  const db = loaded.badgerDb
  if (!(db instanceof BadgerDb)) {
    throw new Error('This story needs a database; configure characters with storyParameters')
  }
  return db
}
