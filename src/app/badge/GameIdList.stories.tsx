// noinspection JSUnusedGlobalSymbols

import GameIdList from './GameIdList.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { OriginBased } from 'coh-content-db'

const meta: Meta<typeof GameIdList> = {
  title: 'badge/GameIdList',
  component: GameIdList
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Both: StoryType = {
  args: {
    value: new OriginBased(['Level50', 'P_Level50'])
  },
}

export const Primal_Only: StoryType = {
  args: {
    value: new OriginBased('Level50')
  },
}

export const Long: StoryType = {
  args: {
    value: new OriginBased(['Mission_LowLevel_SC_Guardian', 'Mission_DA_PersonalArc_Complete_05'])
  },
}
