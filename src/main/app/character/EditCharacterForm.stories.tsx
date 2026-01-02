// noinspection JSUnusedGlobalSymbols

import EditCharacterForm from './EditCharacterForm.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof EditCharacterForm> = {
  title: 'character/EditCharacterForm',
  component: EditCharacterForm,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const New: StoryType = {
  args: {
    character: undefined,
    onSave: async (value) => {
      return new Promise((resolve) => setTimeout(() => {
        alert(JSON.stringify(value))
        resolve()
      }, 2000))
    }
  },
}

export const Existing: StoryType = {
  args: {
    character: { name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer', morality: 'rogue', sex: 'F' }
  },
}

export const Existing_Minimum: StoryType = {
  args: {
    character: { name: 'Test' }
  },
}
