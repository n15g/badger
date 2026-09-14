import { describe, expect, it } from 'vitest'
import { Character } from '../character/character.ts'
import { buildCharacterImportPlan } from './character-import-plan.ts'

describe('character import planning', () => {
  const characters: Character[] = [
    { key: 'alice', name: 'Alice' },
    { key: 'bob', name: 'Bob' },
  ]

  it('prefers an exact key match over a different character with the incoming name', () => {
    const incoming = { key: 'alice', name: 'Bob' }
    expect(buildCharacterImportPlan([incoming], characters)).toEqual({
      alice: { incoming, existing: characters[0], action: 'replace' },
    })
  })

  it('proposes merging a name match when the incoming key is absent or unknown', () => {
    for (const key of [undefined, 'another-installation']) {
      const incoming = { key, name: 'Alice' }
      expect(Object.values(buildCharacterImportPlan([incoming], characters))).toEqual([
        { incoming, existing: characters[0], action: 'merge' },
      ])
    }
  })

  it('gives separate plan entries to unmatched characters without changing the inputs', () => {
    const incoming = [{ name: 'Carol' }, { name: 'Dave' }]
    const original = structuredClone({ incoming, characters })
    const plan = buildCharacterImportPlan(incoming, characters)
    expect(Object.keys(plan)).toHaveLength(2)
    expect(Object.values(plan)).toEqual(incoming.map(character => ({
      incoming: character, existing: undefined, action: 'new',
    })))
    expect({ incoming, characters }).toEqual(original)
  })
})
