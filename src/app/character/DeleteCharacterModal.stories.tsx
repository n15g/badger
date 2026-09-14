// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import DeleteCharacterModal from './DeleteCharacterModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof DeleteCharacterModal> = {
  title: 'character/DeleteCharacterModal',
  component: DeleteCharacterModal,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: TEST_CHARACTERS[0]
  },
}
