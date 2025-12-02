// noinspection JSUnusedGlobalSymbols

import { MoralityList } from 'coh-content-db'
import MoralityListIcons from './MoralityListIcons.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof MoralityListIcons> = {
  title: 'morality/MoralityListIcons',
  component: MoralityListIcons,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const All: StoryType = {
  args: {
    moralityList: new MoralityList(['all'])
  },
}

export const None: StoryType = {
  args: {
    moralityList: new MoralityList()
  },
}

export const Villain: StoryType = {
  args: {
    moralityList: new MoralityList(['villain'])
  },
}
