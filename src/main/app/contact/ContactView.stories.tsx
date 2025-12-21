// noinspection JSUnusedGlobalSymbols

import ContactView from './ContactView.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ContactView> = {
  title: 'contact/ContactView',
  component: ContactView,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const All: StoryType = {
  args: {
    contact: STORYBOOK_CONTENT.getContact('anti-matter')
  },
}
