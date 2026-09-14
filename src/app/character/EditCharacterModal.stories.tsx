// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import EditCharacterModal from './EditCharacterModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof EditCharacterModal> = {
  title: 'character/EditCharacterModal',
  component: EditCharacterModal,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: TEST_CHARACTERS[0]
  },
}
