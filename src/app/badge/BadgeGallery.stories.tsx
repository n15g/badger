// noinspection JSUnusedGlobalSymbols

import BadgeGallery from './BadgeGallery.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'

const meta: Meta<typeof BadgeGallery> = {
  title: 'badge/BadgeGallery',
  component: BadgeGallery,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const No_Character: StoryType = {}

export const Test_Character: StoryType = {}
Test_Character.decorators = [(Story) => (
  <CharacterContextProvider character={
    {
      key: 'test', name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer',
      badges: { 'lobbyist': { owned: true } }
    }}>
    <Story/>
  </CharacterContextProvider>
)]
