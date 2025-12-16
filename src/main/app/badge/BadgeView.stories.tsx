// noinspection JSUnusedGlobalSymbols

import BadgeView from './BadgeView.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof BadgeView> = {
  title: 'badge/BadgeView',
  component: BadgeView,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Exploration: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman')
  },
}

export const With_Acquisition: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('generational-trauma'),
  },
}

export const Multiple_BadgeText: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hero-of-the-city'),
  },
}

export const With_Effect: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.badges.find((badge) => badge.effect),
  },
}
