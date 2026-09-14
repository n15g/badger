// noinspection JSUnusedGlobalSymbols

import BadgeCount from './BadgeCount.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

const meta: Meta<typeof BadgeCount> = {
  title: 'character/BadgeCount',
  component: BadgeCount,
  tags: ['interaction'],
}
export default meta
type StoryType = StoryObj<typeof BadgeCount>

export const None: StoryType = {
  args: {
    character: { key: 'test', name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('0 badges')).toBeVisible()
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
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('2 badges')).toBeVisible()
  },
}

export const One_With_Uncounted: StoryType = {
  args: {
    character: {
      key: 'test', name: 'Test', badges: {
        'hangman': { owned: true },
        'bug-hunter': { owned: true }
      }
    }
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('1 badge')).toBeVisible()
  },
}

export const Unowned_And_Unknown: StoryType = {
  args: { character: { badges: {
    hangman: { owned: false },
    abomination: { req: { task: { owned: true } } },
    'unknown-badge': { owned: true },
  } } },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('0 badges')).toBeVisible()
  },
}
