// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import BadgeIconButton from './BadgeIconButton.tsx'

const meta: Meta<typeof BadgeIconButton> = {
  title: 'badge/BadgeIconButton',
  component: BadgeIconButton,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('abomination'),
    onFrobnicate: async () => {
      return new Promise((resolve) => setTimeout(() => {
        resolve()
      }, 2000))
    }
  },
}

