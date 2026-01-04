// noinspection JSUnusedGlobalSymbols

import ContactTooltip from './ContactTooltip.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Contact } from 'coh-content-db'
import { Box, Typography } from '@mui/joy'

const meta: Meta<typeof ContactTooltip> = {
  title: 'contact/ContactTooltip',
  component: ContactTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    contact: STORYBOOK_CONTENT.getContact('anti-matter'),
    children: <Box/>,
    open: true,
  },
}

export const No_LevelRange: StoryType = {
  args: {
    contact: STORYBOOK_CONTENT.getContact('null-the-gull'),
    children: <Box/>,
    open: true,
  },
}

export const Minimal: StoryType = {
  args: {
    contact: new Contact({ key: 'minimal', name: 'Minimal Test' }),
    children: <Box/>,
    open: true,
  },
}

export const Popup: StoryType = {
  args: {
    contact: STORYBOOK_CONTENT.getContact('anti-matter'),
    children: <Typography>Hover me</Typography>,
  },
}
