// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import MissionCard from './MissionCard.tsx'
import { STORYBOOK_CONTENT, TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MissionCard> = {
  title: 'mission/MissionCard',
  component: MissionCard,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
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
