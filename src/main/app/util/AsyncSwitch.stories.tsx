// noinspection JSUnusedGlobalSymbols

import AsyncSwitch from './AsyncSwitch.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

const meta: Meta<typeof AsyncSwitch> = {
  title: 'util/AsyncSwitch',
  component: AsyncSwitch,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {

  render: () => {
    const [args, setArgs] = useArgs()

    const onFrobnicate: (next: boolean) => Promise<void> = async (next: boolean) => {
      return new Promise((resolve) => setTimeout(() => {
        setArgs({ checked: next })
        resolve()
      }, 2000))
    }

    return <AsyncSwitch {...args} onFrobnicate={onFrobnicate}/>
  }
}
