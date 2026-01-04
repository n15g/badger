// noinspection JSUnusedGlobalSymbols

import ZoneTooltip from './ZoneTooltip.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Typography } from '@mui/joy'

const meta: Meta<typeof ZoneTooltip> = {
  title: 'zone/ZoneTooltip',
  component: ZoneTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park'),
    children: <Box/>,
    open: true,
  },
}

export const Bloody_bay: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('bloody-bay'),
    children: <Box/>,
    open: true,
  },
}

export const Popup: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park'),
    children: <Typography>Hover me</Typography>,
  },
}
