import { describe, expect, it, vi } from 'vitest'
import { importFiles } from './importer.ts'
import { blobify } from './blobify.ts'
import { createCharacterEnvelope } from './export-envelope.ts'
import { BadgerV2ExportFileParser } from './parser/badger-v2-export-file-parser.ts'
import { CoHBuildFileParser } from './parser/coh-build-file-parser.ts'
import { CoHLogFileParser } from './parser/coh-log-file-parser.ts'
import { createTestContent } from '../../../test/support/content.ts'
import { Character } from '../character/character.ts'

describe('file imports', () => {
  const characters: Character[] = [{
    key: 'alice', name: 'Alice', morality: 'rogue',
    badges: { explorer: { owned: true, req: { visits: { count: 2 } } } },
  }]

  it.each([false, true])('round-trips a character export with gzip=%s', async gzip => {
    const exported = await blobify({ payload: createCharacterEnvelope(characters), gzip })
    const file = new File([exported.blob], `characters${exported.extension}`, { type: exported.mime })
    const [result] = await importFiles([file], [BadgerV2ExportFileParser])
    expect(result).toEqual({
      file, accepted: true, characters,
      tags: gzip ? ['badger', 'gzip', 'json'] : ['badger', 'json'],
    })
  })

  it('handles mixed files in order and lets the appropriate parser accept each one', async () => {
    const files = [
      new File(['  \nAlice: Class_Blaster\nBadges Earned:\nVeteran'], 'build.txt'),
      new File(['2026-01-10 20:38:42 Congratulations! You earned the Explorer badge'], 'chat.txt'),
      new File(['ordinary text'], 'notes.txt'),
    ]
    const content = createTestContent()
    const results = await importFiles(files, [
      BadgerV2ExportFileParser, new CoHBuildFileParser(content), new CoHLogFileParser(content),
    ])
    expect(results).toEqual([
      { file: files[0], accepted: true, tags: ['build', 'text'], characters: [
        { name: 'Alice', archetypeKey: 'blaster', badges: { veteran: { owned: true } } },
      ] },
      { file: files[1], accepted: true, tags: ['log', 'text'], characters: [
        { name: 'Unknown Character', badges: { explorer: { owned: true } } },
      ] },
      { file: files[2], accepted: false, tags: ['unknown'] },
    ])
  })

  it('reports malformed JSON and still processes the next file', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const bad = new File(['{broken'], 'broken.json')
    const good = new File([JSON.stringify(createCharacterEnvelope(characters))], 'good.json')
    const [failure, success] = await importFiles([bad, good], [BadgerV2ExportFileParser])
    expect(failure).toMatchObject({ file: bad, accepted: false, tags: ['json', 'error'] })
    expect(failure.error).toBeTypeOf('string')
    expect(failure.error).not.toBe('')
    expect(success).toMatchObject({ accepted: true, characters })
  })
})
