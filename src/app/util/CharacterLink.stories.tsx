// noinspection JSUnusedGlobalSymbols

import CharacterLink from './CharacterLink.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Character } from '../character/character.ts'

const meta: Meta<typeof CharacterLink> = {
  title: 'character/CharacterLink',
  component: CharacterLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

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

export const Undefined: StoryType = {
  args: {
    value: undefined
  },
}
