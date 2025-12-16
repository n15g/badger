// noinspection JSUnusedGlobalSymbols

import ReleaseDate from './ReleaseDate.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ReleaseDate> = {
  title: 'util/ReleaseDate',
  component: ReleaseDate
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Short: StoryType = {
  args: {
    value: new Date('2025-04-01'),
    format: 'short'
  },
}

export const Long: StoryType = {
  args: {
    value: new Date('2025-04-01'),
    format: 'long'
  },
}

export const Default: StoryType = {
  args: {
    value: new Date('2025-04-01'),
  },
}
