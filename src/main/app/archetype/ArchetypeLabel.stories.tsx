// noinspection JSUnusedGlobalSymbols

import ArchetypeLabel from './ArchetypeLabel.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ArchetypeLabel> = {
  title: 'archetype/ArchetypeLabel',
  component: ArchetypeLabel,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Blaster_Object: StoryType = {
  args: {
    value: STORYBOOK_CONTENT.getArchetype('blaster')
  },
}

export const Controller_Key: StoryType = {
  args: {
    value: 'controller'
  },
}

export const Unknown: StoryType = {
  args: {
    value: 'doober'
  },
}
