// noinspection JSUnusedGlobalSymbols

import SetTitleLabel from './SetTitleLabel.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { OriginBased } from 'coh-content-db'

const meta: Meta<typeof SetTitleLabel> = {
  title: 'badge/SetTitleLabel',
  component: SetTitleLabel
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Both: StoryType = {
  args: {
    value: new OriginBased([10, 22])
  },
}

export const Primal_Only: StoryType = {
  args: {
    value: new OriginBased([10])
  },
}

export const Long: StoryType = {
  args: {
    value: new OriginBased([1024, 2048])
  },
}
