// noinspection JSUnusedGlobalSymbols

import MissionLink from './MissionLink.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MissionLink> = {
  title: 'mission/MissionLink',
  component: MissionLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const By_Object: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getMission('abandoned-sewers-trial')
  },
}

export const By_Key: StoryType = {
  args: {
    value: 'abandoned-sewers-trial'
  },
}

export const Unknown_Key: StoryType = {
  args: {
    value: 'invalid-key'
  },
}

