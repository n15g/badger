// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import BadgeCharactersPanel from './BadgeCharactersPanel.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT, TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'

const meta: Meta<typeof BadgeCharactersPanel> = {
  title: 'badge/BadgeCharactersPanel',
  component: BadgeCharactersPanel,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
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

