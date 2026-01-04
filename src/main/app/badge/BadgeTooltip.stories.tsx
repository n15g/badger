// noinspection JSUnusedGlobalSymbols

import BadgeTooltip from './BadgeTooltip.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Box, Typography } from '@mui/joy'

const meta: Meta<typeof BadgeTooltip> = {
  title: 'badge/BadgeTooltip',
  component: BadgeTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const content = STORYBOOK_CONTENT

export const Exploration: StoryType = {
  args: {
    badge: content.getBadge('lobbyist'),
    children: <Box/>,
    open: true
  },
}

export const Single_Icon: StoryType = {
  args: {
    badge: content.getBadge('abomination'),
    children: <Box/>,
    open: true
  },
}

export const Multiple_Icons: StoryType = {
  args: {
    badge: content.getBadge('until-the-end-of-the-world'),
    children: <Box/>,
    open: true
  },
}

export const Popup: StoryType = {
  args: {
    badge: content.getBadge('lobbyist'),
    children: <Typography>Hover me</Typography>
  },
}
