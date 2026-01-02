// noinspection JSUnusedGlobalSymbols

import CharacterListPage from './CharacterListPage.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof CharacterListPage> = {
  title: 'character/CharacterListPage',
  component: CharacterListPage
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Empty: StoryType = {
  args: {
    characters: []
  },
}

export const Many_Characters: StoryType = {
  args: {
    characters: STORYBOOK_CONTENT.archetypes.map((archetype) => {
      return { key: archetype.key, name: archetype.name, server: 'Torchbearer', archetypeKey: archetype.key }
    })
  },
}
