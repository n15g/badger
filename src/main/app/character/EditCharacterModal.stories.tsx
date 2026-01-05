// noinspection JSUnusedGlobalSymbols

import EditCharacterModal from './EditCharacterModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof EditCharacterModal> = {
  title: 'character/EditCharacterModal',
  component: EditCharacterModal
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: { key: 'abc', name: 'Test Character', server: 'Some Server', archetypeKey: 'controller' }
  },
}
