import { describe, expect, it } from 'vitest'
import { getStorybookScenario, storyParameters } from '../.storybook/storybook-scenario.ts'

describe('Storybook scenario validation', () => {
  it('allows an explicit empty database without selecting a character', () => {
    expect(() => getStorybookScenario(storyParameters({ characters: [] }))).not.toThrow()
  })

  it('rejects a selected character absent from the fixtures', () => {
    expect(() => getStorybookScenario(storyParameters({
      characters: [{ key: 'alice', name: 'Alice' }], characterKey: 'alcie',
    }))).toThrow('Unknown Storybook character key: alcie')
  })

  it('rejects duplicate fixture keys instead of overwriting a character', () => {
    expect(() => getStorybookScenario(storyParameters({ characters: [
      { key: 'alice', name: 'Alice' }, { key: 'alice', name: 'Someone else' },
    ] }))).toThrow('unique keys')
  })

  it('rejects relative initial routes', () => {
    expect(() => getStorybookScenario(storyParameters({ initialRoute: 'characters' }))).toThrow('must start with /')
  })
})
