// noinspection JSUnusedGlobalSymbols

import { MoralityList } from 'coh-content-db'
import MoralityListIcons from './MoralityListIcons.tsx'

export default {
  title: 'morality/MoralityList',
  component: MoralityListIcons,
}

export const All = {
  args: {
    moralityList: new MoralityList(['all'])
  },
}

export const None = {
  args: {
    moralityList: {}
  },
}

export const Villain = {
  args: {
    moralityList: new MoralityList(['villain'])
  },
}
