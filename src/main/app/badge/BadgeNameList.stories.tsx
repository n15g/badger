// noinspection JSUnusedGlobalSymbols

import BadgeNameList from './BadgeNameList.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof BadgeNameList> = {
  title: 'badge/BadgeNameList',
  component: BadgeNameList
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Simple_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('abomination')
  },
}

export const Complex_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('lobbyist')
  },
}

export const Gendered_Name: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman')
  },
}
