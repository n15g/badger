// noinspection JSUnusedGlobalSymbols

import ZoneView from './ZoneView.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof ZoneView> = {
  title: 'zone/ZoneView',
  component: ZoneView,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park')
  },
}
