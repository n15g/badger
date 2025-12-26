// noinspection JSUnusedGlobalSymbols

import BadgeCount from './BadgeCount.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof BadgeCount> = {
  title: 'character/BadgeCount',
  component: BadgeCount,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const None: StoryType = {
  args: {
    character: { key: 'test', name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
}

export const Two: StoryType = {
  args: {
    character: {
      key: 'test', name: 'Test', badges: {
        'hangman': { owned: true },
        'abomination': { owned: true }
      }
    }
  },
}

export const One_With_Uncounted: StoryType = {
  args: {
    character: {
      key: 'test', name: 'Test', badges: {
        'hangman': { owned: true },
        'badge-hunter': { owned: true }
      }
    }
  },
}
