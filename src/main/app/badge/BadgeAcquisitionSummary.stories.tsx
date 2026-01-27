// noinspection JSUnusedGlobalSymbols

import BadgeAcquisitionSummary from './BadgeAcquisitionSummary.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof BadgeAcquisitionSummary> = {
  title: 'badge/BadgeAcquisitionSummary',
  component: BadgeAcquisitionSummary,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const content = STORYBOOK_CONTENT

export const Exploration_Simple: StoryType = {
  args: {
    badge: content.getBadge('lobbyist')
  },
}

export const Exploration_Multiple_One_Zone: StoryType = {
  args: {
    badge: content.getBadge('secret-prisoner')
  },
}

export const Exploration_Multiple_Zones: StoryType = {
  args: {
    badge: content.getBadge('river-rat')
  },
}

export const History: StoryType = {
  args: {
    badge: content.getBadge('lorekeeper')
  },
}

export const Accomplishment: StoryType = {
  args: {
    badge: content.getBadge('former-servant-of-recluse')
  },
}

export const Invention_Singular: StoryType = {
  args: {
    badge: content.getBadge('decaying')
  },
}

export const Invention_Plural: StoryType = {
  args: {
    badge: content.getBadge('protector')
  },
}

export const Invention_Plus_One: StoryType = {
  args: {
    badge: content.getBadge('guardian')
  },
}
