// noinspection JSUnusedGlobalSymbols

import ZoneCard from './ZoneCard.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof ZoneCard> = {
  title: 'zone/ZoneCard',
  component: ZoneCard,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    zone: STORYBOOK_CONTENT.getZone('atlas-park')
  },
}
