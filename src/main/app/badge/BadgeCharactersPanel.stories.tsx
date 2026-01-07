// noinspection JSUnusedGlobalSymbols

import BadgeCharactersPanel from './BadgeCharactersPanel.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof BadgeCharactersPanel> = {
  title: 'badge/BadgeCharactersPanel',
  component: BadgeCharactersPanel,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman'),
    characters: [
      {
        key: 'test',
        name: 'Has Badge',
        server: 'Torchbearer',
        morality: 'rogue',
        archetypeKey: 'mastermind',
        badges: { 'hangman': { owned: true } }
      },
      {
        key: 'none',
        name: 'No Badge',
        server: 'Torchbearer',
        morality: 'hero',
        archetypeKey: 'sentinel',
      }
    ]
  }
}

export const No_Characters: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman'),
    characters: []
  }
}

