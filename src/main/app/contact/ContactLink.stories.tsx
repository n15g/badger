// noinspection JSUnusedGlobalSymbols

import ContactLink from './ContactLink.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ContactLink> = {
  title: 'contact/ContactLink',
  component: ContactLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const By_Object: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getContact('anti-matter')
  },
}

export const By_Key: StoryType = {
  args: {
    value: 'anti-matter'
  },
}

export const Unknown_Key: StoryType = {
  args: {
    value: 'invalid-key'
  },
}

