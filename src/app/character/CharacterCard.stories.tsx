// noinspection JSUnusedGlobalSymbols

import CharacterCard from './CharacterCard.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof CharacterCard> = {
  title: 'character/CharacterCard',
  component: CharacterCard,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    character: { key: 'test', name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
}

export const Long_Name: StoryType = {
  args: {
    character: { key: 'test', name: 'This is a really long character name', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
}

export const Unknown_Archetype: StoryType = {
  args: {
    character: { key: 'test', name: 'This is a really long character name', archetypeKey: undefined, server: 'Torchbearer' }
  },
}
