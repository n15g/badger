// noinspection JSUnusedGlobalSymbols

import MissionTooltip from './MissionTooltip.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'
import { MoralityList } from 'coh-content-db'
import { Box, Typography } from '@mui/joy'

const meta: Meta<typeof MissionTooltip> = {
  title: 'mission/MissionTooltip',
  component: MissionTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('abandoned-sewers-trial'),
    children: <Box/>,
    open: true,
  },
}

export const Couple_Of_Contacts: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('stop-the-lost-attack'),
    children: <Box/>,
    open: true,
  },
}

export const Multiple_Contacts: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('retrieve-the-stolen-weapons-from-the-freakshow'),
    children: <Box/>,
    open: true
  },
}

export const Minimal: StoryType = {
  args: {
    mission: {
      key: 'no-level-range',
      type: 'story-arc',
      morality: new MoralityList(['heroic']),
      name: 'No Level Range Test',
      links: [],
    },
    children: <Box/>,
    open: true
  },
}

export const Popup: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('abandoned-sewers-trial'),
    children: <Typography>Hover me</Typography>,
  },
}
