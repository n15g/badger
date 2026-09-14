import { describe, expect, it } from 'vitest'
import { CoHLogFileParser } from './coh-log-file-parser.ts'
import { createTestContent } from '../../../../test/support/content.ts'

describe('chat log parsing', () => {
  it('tracks character switches and combines repeated visits, title changes, and badge awards', async () => {
    const parser = new CoHLogFileParser(createTestContent())
    const lines = [
      'Welcome to City of Heroes, Alice!',
      'Congratulations! You earned the EXPLORER badge',
      'Now entering the Rogue Isles, Bob!',
      'Veteran has been selected as new title',
      'Congratulations! You earned the Unknown Badge badge',
      'Welcome to City of Heroes, Alice!',
      'Trailblazer has been selected as new title',
      'Veteran has been selected as new title',
    ]
    const result = await parser.onText(lines.map(line => `2026-01-10 20:38:42 ${line}`).join('\r\n'))
    expect(result).toEqual({ tags: ['log'], characters: [
      { name: 'Alice', badges: { explorer: { owned: true }, veteran: { owned: true } } },
      { name: 'Bob', badges: { veteran: { owned: true } } },
    ] })
  })

  it('keeps awards before the first login under an unknown character', async () => {
    const parser = new CoHLogFileParser(createTestContent())
    expect(await parser.onText('2026-01-10 20:38:42 Congratulations! You earned the Explorer badge')).toEqual({
      tags: ['log'], characters: [{ name: 'Unknown Character', badges: { explorer: { owned: true } } }],
    })
  })

  it('declines a log without any recognized import events', async () => {
    expect(await new CoHLogFileParser(createTestContent()).onText('2026-01-10 20:38:42 You activate Sprint.')).toBeUndefined()
  })
})
