import 'fake-indexeddb/auto'
import { deleteDB } from 'idb'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CohContentDatabase } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'
import { Character } from '../character/character.ts'
import type { BadgerDb } from '../db/badger-db.ts'
import { buildCharacterImportPlan } from './character-import-plan.ts'
import { executeCharacterImportPlan } from './execute-character-import-plan.ts'
import { createCharacterEnvelope } from './export-envelope.ts'
import { importFiles } from './importer.ts'
import { BadgerV2ExportFileParser } from './parser/badger-v2-export-file-parser.ts'
import { CoHBuildFileParser } from './parser/coh-build-file-parser.ts'

const content = new CohContentDatabase(HOMECOMING)
const importedBadges = {
  'defender-of-truth': { owned: true },
  'night-widow': { owned: false },
  decaying: {
    owned: false,
    req: { a: { owned: true, count: 1 }, b: { owned: true, count: 1 }, c: { owned: true } },
  },
}

describe('executing character imports', () => {
  let db: BadgerDb

  beforeEach(async () => {
    vi.resetModules()
    const { getBadgerDb } = await import('../db/badger-db.ts')
    db = await getBadgerDb()
  })

  afterEach(async () => {
    db.close()
    await deleteDB('badger-2')
  })

  async function importCharacters(files: File[]) {
    const results = await importFiles(files, [BadgerV2ExportFileParser, new CoHBuildFileParser(content)])
    expect(results.every(result => result.accepted)).toBe(true)
    const incoming = results.flatMap(result => result.characters ?? [])
    const plan = buildCharacterImportPlan(incoming, await db.getCharacters())
    await executeCharacterImportPlan(plan, db)
    return plan
  }

  function exportFile(characters: Character[]) {
    return new File([JSON.stringify(createCharacterEnvelope(characters))], 'characters.json')
  }

  it.each(['new', 'replace', 'merge'])('keeps completed but uncollected badges uncollected during %s imports', async action => {
    // These fixtures meet the real badge prerequisites, including invention counts.
    expect(content.getBadge('night-widow')?.requirements.map(req => req.badgeKey)).toEqual(['defender-of-truth'])
    expect(content.getBadge('decaying')?.requirements.map(req => ({ key: req.key, count: req.count }))).toEqual([
      { key: 'a', count: 1 }, { key: 'b', count: 1 }, { key: 'c', count: undefined },
    ])

    if (action !== 'new') {
      await db.saveCharacter({
        key: 'local', name: 'Alice',
        badges: action === 'replace'
          ? { 'night-widow': { owned: true }, decaying: { owned: true } }
          : { hangman: { owned: true } },
      })
    }
    const key = action === 'replace' ? 'local' : 'incoming'
    const plan = await importCharacters([exportFile([
      { key, name: 'Alice', badges: importedBadges },
      // A second entry exercises the batch loop and explicit imported ownership.
      { key: 'bob', name: 'Bob', badges: { 'night-widow': { owned: true } } },
    ])])
    expect(Object.values(plan).map(entry => entry.action)).toEqual([action, 'new'])
    const saved = await db.getCharacter(action === 'merge' ? 'local' : key)
    expect(saved?.badges).toEqual({
      ...(action === 'merge' ? { hangman: { owned: true } } : {}),
      ...importedBadges,
    })
    expect((await db.getCharacter('bob'))?.badges).toEqual({ 'night-widow': { owned: true } })
    expect(await db.getCharacters()).toHaveLength(2)
  })

  it('does not award a badge when merging imports completes its remaining requirements', async () => {
    await db.saveCharacter({
      key: 'local', name: 'Alice', badges: {
        decaying: { owned: false, req: { a: { owned: true, count: 1 } } },
        'night-widow': { owned: true },
      },
    })
    await importCharacters([exportFile([{
      key: 'incoming', name: 'Alice', badges: {
        'defender-of-truth': { owned: true },
        'night-widow': { owned: false },
        decaying: { req: { b: { owned: true, count: 1 }, c: { owned: true } } },
      },
    }])])
    expect((await db.getCharacter('local'))?.badges).toEqual({
      ...importedBadges,
      // Merge retains an explicitly collected badge even if the import leaves it unchecked.
      'night-widow': { owned: true },
    })
    expect(await db.getCharacter('incoming')).toBeUndefined()
  })

  it('imports only badges listed as earned in a build file', async () => {
    await importCharacters([new File([
      'Alice: Class_Blaster\nBadges Earned:\nLevel30\n',
    ], 'build.txt')])
    const characters = await db.getCharacters()
    expect(characters).toHaveLength(1)
    expect(characters[0]).toMatchObject({ name: 'Alice', archetypeKey: 'blaster' })
    // Both gladiator badges are absent, despite their level badge prerequisite being earned.
    expect(characters[0].badges).toEqual({ 'defender-of-truth': { owned: true } })
  })

  it('skips ignored entries and merges later entries into the latest saved record', async () => {
    const existing: Character = { key: 'local', name: 'Alice' }
    await db.saveCharacter(existing)
    await executeCharacterImportPlan({
      ignored: { action: 'ignore', existing, incoming: { name: 'Ignored', badges: { hangman: { owned: true } } } },
      first: { action: 'merge', existing, incoming: { badges: { 'defender-of-truth': { owned: true } } } },
      second: { action: 'merge', existing, incoming: { badges: { 'night-widow': { owned: false } } } },
    }, db)
    expect(await db.getCharacters()).toEqual([{
      ...existing, badges: { 'defender-of-truth': { owned: true }, 'night-widow': { owned: false } },
    }])
  })
})
