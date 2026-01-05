// noinspection JSUnusedGlobalSymbols

import BadgerMarkdown from './BadgerMarkdown.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof BadgerMarkdown> = {
  title: 'util/BadgerMarkdown',
  component: BadgerMarkdown,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Badge_Link: StoryType = {
  args: {
    content: 'This is some markdown content with a [hangman](badge://hangman) badge link'
  },
}

export const Contact_Link: StoryType = {
  args: {
    content: 'This is some markdown content with a [anti-matter](contact://anti-matter) contact link'
  },
}

export const Mission_Link: StoryType = {
  args: {
    content: 'This is some markdown content with a [abandoned-sewers-trial](mission://abandoned-sewers-trial) mission link'
  },
}

export const Zone_Link: StoryType = {
  args: {
    content: 'This is some markdown content with a [rikti-war-zone](zone://rikti-war-zone) badge link'
  },
}

export const External_Link: StoryType = {
  args: {
    content: 'This is some markdown content with a [Google](https://google.com) link'
  },
}

export const Homecoming_Wiki: StoryType = {
  args: {
    content: 'This is some markdown content with a [Homecoming Wiki](https://homecoming.wiki/something) link'
  },
}

export const Paragon_Wiki: StoryType = {
  args: {
    content: 'This is some markdown content with a [Paragon Wiki](https://archive.paragonwiki.com/something) link'
  },
}

export const Bad_Protocol: StoryType = {
  args: {
    content: 'This is some markdown content with an invalid protocol that should not appear here: [[Bad](bad://google.com)]'
  },
}
