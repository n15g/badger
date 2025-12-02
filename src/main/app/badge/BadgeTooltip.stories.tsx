// noinspection JSUnusedGlobalSymbols

import BadgeTooltip from './BadgeTooltip.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof BadgeTooltip> = {
  title: 'badge/BadgeTooltip',
  component: BadgeTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const content = STORYBOOK_CONTENT

export const Exploration: StoryType = {
  args: {
    badge: content.getBadge('lobbyist')
  },
}

export const Single_Icon: StoryType = {
  args: {
    badge: content.getBadge('abomination')
  },
}

export const Multiple_Icons: StoryType = {
  args: {
    badge: content.getBadge('until-the-end-of-the-world')
  },
}

