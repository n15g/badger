import 'fake-indexeddb/auto'
import { deleteDB } from 'idb'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Character } from '../character/character.ts'
import type { BadgerDb } from './badger-db.ts'

describe('character persistence', () => {
  let db: BadgerDb

  beforeEach(async () => {
    // Recreate the module's connection cache as well as the database between tests.
    vi.resetModules()
    const { getBadgerDb } = await import('./badger-db.ts')
    db = await getBadgerDb()
  })

  afterEach(async () => {
    db.close()
    await deleteDB('badger-2')
  })

  it('creates an empty database and reports missing characters explicitly', async () => {
    expect(await db.getCharacters()).toEqual([])
    expect(await db.getCharacter('missing')).toBeUndefined()
    expect(await db.getKv('missing')).toBeUndefined()
  })

  it('saves, replaces, and deletes a character without affecting other records', async () => {
    const alice: Character = { key: 'alice', name: 'Alice', badges: { explorer: { owned: true } } }
    const bob: Character = { key: 'bob', name: 'Bob' }
    await db.saveCharacter(alice)
    await db.saveCharacter(bob)
    expect(await db.getCharacter('alice')).toEqual(alice)

    const updated = { ...alice, name: 'Alicia', badges: { veteran: { req: { visits: { count: 3 } } } } }
    await db.saveCharacter(updated)
    expect(await db.getCharacters()).toEqual([updated, bob])
    await db.deleteCharacter('alice')
    expect(await db.getCharacter('alice')).toBeUndefined()
    expect(await db.getCharacters()).toEqual([bob])
  })

  it('retains character and settings data when the application opens a new connection', async () => {
    const character = { key: 'alice', name: 'Alice' }
    await db.saveCharacter(character)
    await db.putKv('bundle-source', 'https://example.com/content.json')
    db.close()
    vi.resetModules()
    const { getBadgerDb } = await import('./badger-db.ts')
    db = await getBadgerDb()
    expect(await db.getCharacter('alice')).toEqual(character)
    expect(await db.getKv('bundle-source')).toBe('https://example.com/content.json')
  })
})
