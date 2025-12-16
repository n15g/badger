// noinspection JSUnusedGlobalSymbols

import SetTitleLabel from './SetTitleLabel.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { SetTitleIds } from 'coh-content-db'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof SetTitleLabel> = {
  title: 'badge/SetTitleLabel',
  component: SetTitleLabel
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Both: StoryType = {
  args: {
    value: new SetTitleIds([10, 22])
  },
}

export const Primal_Only: StoryType = {
  args: {
    value: new SetTitleIds([10])
  },
}
console.log(STORYBOOK_CONTENT.badges.find((badge) => badge.setTitleId?.praetorian))
export const Long: StoryType = {
  args: {
    value: new SetTitleIds([1024, 2048])
  },
}
