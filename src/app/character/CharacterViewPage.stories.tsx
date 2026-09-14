// noinspection JSUnusedGlobalSymbols

import CharacterViewPage from './CharacterViewPage.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof CharacterViewPage> = {
  title: 'character/CharacterViewPage',
  component: CharacterViewPage
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: { key: 'abc', name: 'Test Character', server: 'Some Server', archetypeKey: 'controller' }
  },
}
