// noinspection JSUnusedGlobalSymbols

import ZoneLink from './ZoneLink.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ZoneLink> = {
  title: 'zone/ZoneLink',
  component: ZoneLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const By_Object: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getZone('atlas-park')
  },
}

export const By_Key: StoryType = {
  args: {
    value: 'atlas-park'
  },
}

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
