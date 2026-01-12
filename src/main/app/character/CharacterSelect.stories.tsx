// noinspection JSUnusedGlobalSymbols

import CharacterSelect from './CharacterSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Character } from './character.ts'

const TEST_CHARACTERS: Character[] = [
  { key: 'test1', name: 'My Character', server: 'Torchbearer', morality: 'rogue', archetypeKey: 'mastermind' },
  { key: 'test2', name: 'A Character with a Really Long Name', server: 'Everlasting', morality: 'hero', archetypeKey: 'controller' },
  { key: 'test3', name: 'Somebody Else', server: 'Indomitable', morality: 'resistance', archetypeKey: 'sentinel' },
]

const meta: Meta<typeof CharacterSelect> = {
  title: 'character/CharacterSelect',
  component: CharacterSelect,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Unset: StoryType = {
  args: {
    value: undefined,
    characters: TEST_CHARACTERS,
  },
}

export const With_Selected: StoryType = {
  args: {
    value: TEST_CHARACTERS[1],
    characters: TEST_CHARACTERS,
  },
}
