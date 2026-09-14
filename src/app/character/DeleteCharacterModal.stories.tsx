// noinspection JSUnusedGlobalSymbols

import DeleteCharacterModal from './DeleteCharacterModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof DeleteCharacterModal> = {
  title: 'character/DeleteCharacterModal',
  component: DeleteCharacterModal
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: { key: 'abc', name: 'Test Character' }
  },
}
