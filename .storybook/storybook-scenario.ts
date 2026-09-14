import type { Character } from '../src/app/character/character.ts'

export type StorybookScenario = {
  initialRoute?: string,
  width?: 'wide',
} & (
  | { characters: readonly Character[], characterKey?: string }
  | { characters?: undefined, characterKey?: never }
)

// Keep environment settings separate from component args and Storybook's own parameters.
export function storyParameters(scenario: StorybookScenario) {
  return { badger: scenario }
}

export function getStorybookScenario(parameters: { badger?: StorybookScenario }): StorybookScenario {
  const scenario = parameters.badger ?? {}
  if (scenario.initialRoute !== undefined && !scenario.initialRoute.startsWith('/')) {
    throw new Error('A Storybook initialRoute must start with /')
  }
  const keys = scenario.characters?.map(character => character.key) ?? []
  if (new Set(keys).size !== keys.length) {
    throw new Error('Storybook character fixtures must have unique keys')
  }
  if (scenario.characterKey !== undefined && !keys.includes(scenario.characterKey)) {
    throw new Error(`Unknown Storybook character key: ${scenario.characterKey}`)
  }
  return scenario
}
