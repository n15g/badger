// noinspection JSUnusedGlobalSymbols

import AsyncSwitch from './AsyncSwitch.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AsyncSwitch> = {
  title: 'util/AsyncSwitch',
  component: AsyncSwitch,
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
