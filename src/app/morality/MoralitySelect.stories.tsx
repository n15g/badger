// noinspection JSUnusedGlobalSymbols

import MoralitySelect from './MoralitySelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MoralitySelect> = {
  title: 'morality/MoralitySelect',
  component: MoralitySelect,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Unset: StoryType = {
  args: {},
}

export const Vigilante: StoryType = {
  args: {
    value: 'vigilante'
  },
}

export const List_Open: StoryType = {
  args: {
    value: 'rogue',
    listboxOpen: true
  },
}

