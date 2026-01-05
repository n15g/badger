// noinspection JSUnusedGlobalSymbols

import ContactCard from './ContactCard.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ContactCard> = {
  title: 'contact/ContactCard',
  component: ContactCard,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const All: StoryType = {
  args: {
    contact: STORYBOOK_CONTENT.getContact('anti-matter')
  },
}
