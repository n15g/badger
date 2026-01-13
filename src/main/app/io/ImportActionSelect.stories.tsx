// noinspection JSUnusedGlobalSymbols

import ImportActionSelect from './ImportActionSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ImportActionSelect> = {
  title: 'io/ImportActionSelect',
  component: ImportActionSelect,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const With_Selected: StoryType = {
  args: {
    value: 'merge',
  },
}
