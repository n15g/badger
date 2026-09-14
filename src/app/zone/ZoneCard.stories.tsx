// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import ZoneCard from './ZoneCard.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT, TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'

const meta: Meta<typeof ZoneCard> = {
  title: 'zone/ZoneCard',
  component: ZoneCard,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park')
  },
}
