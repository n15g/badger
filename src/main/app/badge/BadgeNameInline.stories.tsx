// noinspection JSUnusedGlobalSymbols

import BadgeNameInline from './BadgeNameInline.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Typography } from '@mui/joy'

const meta: Meta<typeof BadgeNameInline> = {
  title: 'badge/BadgeNameInline',
  component: BadgeNameInline,
  decorators: [
    (Story) => (
      <Typography>
        This is the <Story/> badge amongst text.
      </Typography>
    )
  ]
}

export default meta
type StoryType = StoryObj<typeof meta.component>

export const Simple_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('abomination')
  },
}

export const Complex_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('lobbyist')
  },
}

export const Gendered_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman')
  },
}
