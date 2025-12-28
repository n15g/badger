// noinspection JSUnusedGlobalSymbols

import CharacterView from './CharacterView.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof CharacterView> = {
  title: 'character/CharacterView',
  component: CharacterView
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: { key: 'abc', name: 'Test Character', server: 'Some Server', archetypeKey: 'controller' }
  },
}
