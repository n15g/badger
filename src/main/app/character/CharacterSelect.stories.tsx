// noinspection JSUnusedGlobalSymbols

import CharacterSelect from './CharacterSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { TEST_CHARACTERS } from '../../storybook/storybook-content.ts'

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

export const Disabled: StoryType = {
  args: {
    disabled: true,
    value: TEST_CHARACTERS[1],
    characters: TEST_CHARACTERS,
  },
}
