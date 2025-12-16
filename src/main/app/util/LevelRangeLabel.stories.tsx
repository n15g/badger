// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from '@storybook/react-vite'
import LevelRangeLabel from './LevelRangeLabel.tsx'
import { LevelRange } from 'coh-content-db'

const meta: Meta<typeof LevelRangeLabel> = {
  title: 'util/LevelRangeLabel',
  component: LevelRangeLabel,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Range: StoryType = {
  args: {
    value: new LevelRange([30, 45])
  },
}

export const Unbound: StoryType = {
  args: {
    value: new LevelRange([30])
  },
}

export const Range_50: StoryType = {
  args: {
    value: new LevelRange([30, 50])
  },
}

export const Single_Level: StoryType = {
  args: {
    value: new LevelRange([20, 20])
  },
}

export const Number: StoryType = {
  args: {
    value: new LevelRange(5)
  },
}
