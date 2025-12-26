// noinspection JSUnusedGlobalSymbols

import ArchetypeSelect from './ArchetypeSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ArchetypeSelect> = {
  title: 'character/ArchetypeSelect',
  component: ArchetypeSelect,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Unset: StoryType = {
  args: {},
}

export const Blaster: StoryType = {
  args: {
    value: 'blaster'
  },
}

export const List_Open: StoryType = {
  args: {
    value: 'blaster',
    listboxOpen: true
  },
}

