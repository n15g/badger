// noinspection JSUnusedGlobalSymbols

import ServerSelect from './ServerSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ServerSelect> = {
  title: 'character/ServerSelect',
  component: ServerSelect,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Unset: StoryType = {
  args: {},
}

export const Torchbearer: StoryType = {
  args: {
    value: 'Torchbearer'
  },
}
