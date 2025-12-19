// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import BadgeLink from './BadgeLink.tsx'
import { Typography } from '@mui/joy'

const meta: Meta<typeof BadgeLink> = {
  title: 'badge/BadgeLink',
  component: BadgeLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const content = STORYBOOK_CONTENT

export const Single_Name: StoryType = {
  args: {
    value: content.getBadge('abomination')
  },
}

export const Dual_Name: StoryType = {
  args: {
    value: content.getBadge('lobbyist')
  },
}

export const Load_By_Key: StoryType = {
  args: {
    value: 'until-the-end-of-the-world'
  },
}

export const Gendered_Name: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getBadge('hangman')
  },
}

export const Inline: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getBadge('hangman')
  },
}
Inline.decorators = [(Story) => (
  <Typography>
    Text above Text aboveText aboveText aboveText above<br/>
    This is the <Story/> badge amongst text.<br/>
    Text below Text below Text below Text below Text below<br/>
    Text below Text below Text below Text below Text below
  </Typography>
)]

export const Unknown_Key: StoryType = {
  args: {
    value: 'invalid-key'
  },
}

export const Undefined: StoryType = {
  args: {
    value: undefined
  },
}
