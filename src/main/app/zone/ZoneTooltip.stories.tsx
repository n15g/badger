// noinspection JSUnusedGlobalSymbols

import ZoneTooltip from './ZoneTooltip.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ZoneTooltip> = {
  title: 'zone/ZoneTooltip',
  component: ZoneTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park')
  },
}

