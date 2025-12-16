// noinspection JSUnusedGlobalSymbols

import SmartLink from './SmartLink.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof SmartLink> = {
  title: 'util/SmartLink',
  component: SmartLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const BadgeLink: StoryType = {
  args: {
    href: 'badge://hangman'
  },
}

export const ContactLink: StoryType = {
  args: {
    href: 'contact://anti-matter'
  },
}

export const MissionLink: StoryType = {
  args: {
    href: 'mission://abandoned-sewers-trial'
  },
}

export const ZoneLink: StoryType = {
  args: {
    href: 'zone://atlas-park'
  },
}
