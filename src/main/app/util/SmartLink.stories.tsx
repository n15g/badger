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

export const Homecoming_Wiki_Link: StoryType = {
  render: () => (<SmartLink href={'https://homecoming.wiki/Test'}>Homecoming Wiki Link</SmartLink>)
}

export const Paragon_Wiki_Link: StoryType = {
  render: () => (<SmartLink href={'https://archive.paragonwiki.com/Test'}>Paragon Wiki Link</SmartLink>)
}

export const Other_External_Link: StoryType = {
  render: () => (<SmartLink href={'https://google.com'}>Google Link</SmartLink>)
}
