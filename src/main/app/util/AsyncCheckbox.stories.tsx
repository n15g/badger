// noinspection JSUnusedGlobalSymbols

import AsyncCheckbox from './AsyncCheckbox.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AsyncCheckbox> = {
  title: 'util/AsyncCheckbox',
  component: AsyncCheckbox,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    onFrobnicate: async () => {
      return new Promise((resolve) => setTimeout(() => {
        resolve()
      }, 2000))
    }
  },
}
