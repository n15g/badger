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

export const Single_Location: StoryType = {
  args: {
    badge: content.getBadge('lobbyist')
  },
}

export const Single_Badge: StoryType = {
  args: {
    badge: content.getBadge('abomination')
  },
}

