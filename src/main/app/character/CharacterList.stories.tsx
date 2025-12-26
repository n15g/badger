// noinspection JSUnusedGlobalSymbols

import CharacterList from './CharacterList.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof CharacterList> = {
  title: 'character/CharacterList',
  component: CharacterList
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
