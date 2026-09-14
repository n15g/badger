import { describe, expect, it } from 'vitest'
import { produce } from 'immer'
import { applyPartial, Character, fromPartial } from './character.ts'

describe('character creation', () => {
  it('supplies defaults for a character with no imported metadata', () => {
    const character = fromPartial({})
    expect(character).toEqual({
      key: character.key, name: 'New Character', server: '- Unknown -',
      origin: 'primal', archetypeKey: 'blaster', morality: 'hero', sex: 'M',
    })
    expect(character.key).not.toBe('')
    expect(fromPartial({}).key).not.toBe(character.key)
  })

  it('preserves supplied identity, metadata, and badge progress', () => {
    const incoming: Character = {
      key: 'alice', name: 'Alice', server: 'Everlasting', origin: 'praetorian',
      archetypeKey: 'controller', morality: 'resistance', sex: 'F',
      badges: { explorer: { req: { visits: { count: 2 } } } },
    }
    expect(fromPartial(incoming)).toEqual(incoming)
  })
})

describe('character merging', () => {
  const existing: Character = {
    key: 'alice', name: 'Alice', server: 'Torchbearer', morality: 'rogue',
    badges: {
      explorer: { owned: true, req: { visits: { owned: true, count: 3 } } },
      veteran: { owned: true },
    },
  }

  it('updates supplied metadata without replacing identity or omitted fields', () => {
    const merged = produce(existing, applyPartial({ key: 'incoming', name: 'Alicia', server: undefined }))
    expect(merged).toEqual({ ...existing, name: 'Alicia' })
    expect(existing.name).toBe('Alice')
  })

  it('unions badge ownership without losing existing badges or progress', () => {
    const merged = produce(existing, applyPartial({ badges: {
      explorer: { owned: false },
      newcomer: { owned: true },
    } }))
    expect(merged.badges).toEqual({ ...existing.badges, newcomer: { owned: true } })
    expect(existing.badges?.newcomer).toBeUndefined()
  })

  it('accepts explicit false and zero requirement values while preserving omitted values', () => {
    const merged = produce(existing, applyPartial({ badges: {
      explorer: { req: { visits: { owned: false, count: 0 }, another: { count: 1 } } },
    } }))
    expect(merged.badges?.explorer).toEqual({
      owned: true,
      req: { visits: { owned: false, count: 0 }, another: { count: 1 } },
    })
    const countOnly = produce(existing, applyPartial({ badges: { explorer: { req: { visits: { count: 4 } } } } }))
    expect(countOnly.badges?.explorer?.req?.visits).toEqual({ owned: true, count: 4 })
  })
})
