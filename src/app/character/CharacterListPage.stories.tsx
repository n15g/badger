// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import CharacterListPage from './CharacterListPage.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../../.storybook/storybook-content.ts'

const manyCharacters = STORYBOOK_CONTENT.archetypes.map(archetype => ({
  key: archetype.key, name: archetype.name, server: 'Torchbearer', archetypeKey: archetype.key,
}))

const meta: Meta<typeof CharacterListPage> = {
  title: 'character/CharacterListPage',
  component: CharacterListPage,
  parameters: storyParameters({ characters: [], initialRoute: '/characters' }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Empty: StoryType = {
  args: {
    characters: []
  },
}

export const Many_Characters: StoryType = {
  parameters: storyParameters({ characters: manyCharacters }),
  args: {
    characters: manyCharacters,
  },
}
