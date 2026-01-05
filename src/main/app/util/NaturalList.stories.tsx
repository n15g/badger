// noinspection JSUnusedGlobalSymbols

import NaturalList from './NaturalList.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@mui/joy'

const meta: Meta<typeof NaturalList> = {
  title: 'util/NaturalList',
  component: NaturalList
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const sample_keys = ['1', '2', '3', '4', '5', '6', '7', '8']

export const Full: StoryType = {
  args: {
    keys: sample_keys,
  },
}

export const Rendered: StoryType = {
  args: {
    keys: sample_keys,
    renderFn: (key) => <Button>{key}</Button>
  },
}

export const Or_Conjunction: StoryType = {
  args: {
    keys: sample_keys,
    conjunction: 'or'
  },
}

export const Capped: StoryType = {
  args: {
    keys: sample_keys,
    cap: 5
  },
}

export const Match_Cap: StoryType = {
  args: {
    keys: sample_keys.slice(0, 5),
    cap: 5
  },
}
