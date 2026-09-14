import 'fake-indexeddb/auto'
import { afterEach, describe, expect, it } from 'vitest'
import { createStorybookDb } from '../.storybook/storybook-db.ts'

describe('Storybook database lifecycle', () => {
  const cleanups: (() => Promise<void>)[] = []
  afterEach(async () => {
    for (const cleanup of cleanups.splice(0)) await cleanup()
  })

  it('isolates simultaneous stories and removes only the database being cleaned up', async () => {
    const characters = [{ key: 'alice', name: 'Alice' }]
    const first = await createStorybookDb(characters)
    cleanups.push(first.cleanup)
    const second = await createStorybookDb(characters)
    cleanups.push(second.cleanup)

    await first.db.saveCharacter({ key: 'alice', name: 'Renamed' })
    expect(await first.db.getCharacter('alice')).toEqual({ key: 'alice', name: 'Renamed' })
    expect(await second.db.getCharacter('alice')).toEqual(characters[0])
    expect(characters[0].name).toBe('Alice')

    await first.cleanup()
    expect((await indexedDB.databases()).map(db => db.name)).not.toContain(first.db.db.name)
    expect(await second.db.getCharacters()).toEqual(characters)
  })

  it('supports an empty character list', async () => {
    const { db, cleanup } = await createStorybookDb([])
    cleanups.push(cleanup)
    expect(await db.getCharacters()).toEqual([])
  })

  it('cleans up when fixture data cannot be persisted', async () => {
    const before = await indexedDB.databases()
    const invalidFixture = { key: 'alice', name: 'Alice', unserializable: () => undefined }
    await expect(createStorybookDb([invalidFixture])).rejects.toMatchObject({ name: 'DataCloneError' })
    expect(await indexedDB.databases()).toEqual(before)
  })
})
