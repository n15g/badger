// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import CharacterLink from './CharacterLink.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Character } from '../character/character.ts'

const meta: Meta<typeof CharacterLink> = {
  title: 'character/CharacterLink',
  component: CharacterLink,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof CharacterLink>

const TEST_CHARACTER: Character = {
  key: 'test',
  name: 'Test Character',
  server: 'Torchbearer',
  morality: 'rogue',
  archetypeKey: 'mastermind',
  badges: { 'hangman': { owned: true } }
}

export const Test: StoryType = {
  args: {
    value: TEST_CHARACTER
  },
}

export const Unknown_Key: StoryType = {
  args: {
    value: 'invalid-key'
  },
}
