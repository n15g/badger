import { describe, expect, it } from 'vitest'
import { CoHBuildFileParser } from './coh-build-file-parser.ts'
import { createTestContent } from '../../../../test/support/content.ts'

describe('build file parsing', () => {
  it.each(['\n', '\r\n'])('reads identity and case-insensitive badge IDs with %j line endings', async newline => {
    const parser = new CoHBuildFileParser(createTestContent())
    const result = await parser.onText([
      'Alice: Level 50 Class_Arachnos_Widow',
      'Veteran', // Text before the earned-badges section is not a badge record.
      'Badges Earned:',
      'eXpLoRe_PrAeToRiAn', 'EXPLORE_PRIMAL', 'Unrecognized_Badge',
    ].join(newline))
    expect(result).toEqual({ tags: ['build'], characters: [{
      name: 'Alice', archetypeKey: 'arachnos-widow', badges: { explorer: { owned: true } },
    }] })
  })

  it('starts a fresh character when the same parser processes another file', async () => {
    const parser = new CoHBuildFileParser(createTestContent())
    await parser.onText('Alice: Class_Blaster\nBadges Earned:\nVeteran')
    expect(await parser.onText('Bob: Class_Controller\nBadges Earned:')).toEqual({
      tags: ['build'], characters: [{ name: 'Bob', archetypeKey: 'controller', badges: {} }],
    })
  })

  it('declines unrelated text so another parser can handle it', async () => {
    expect(await new CoHBuildFileParser(createTestContent()).onText('An ordinary note')).toBeUndefined()
  })
})
