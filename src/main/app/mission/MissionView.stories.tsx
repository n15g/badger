// noinspection JSUnusedGlobalSymbols

import MissionView from './MissionView.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MissionView> = {
  title: 'mission/MissionView',
  component: MissionView,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const All: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('retrieve-the-stolen-weapons-from-the-freakshow')
  },
}

export const Notes: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('the-widow-in-red')
  },
}

export const Flashback: StoryType = {
  args: {
    mission: STORYBOOK_CONTENT.getMission('an-act-of-mercy')
  },
}
