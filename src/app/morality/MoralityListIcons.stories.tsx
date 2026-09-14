// noinspection JSUnusedGlobalSymbols

import { MORALITY_EXTENDED, MoralityList } from 'coh-content-db'
import MoralityListIcons from './MoralityListIcons.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'

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
    moralityList: new MoralityList([])
  },
}

export const Villain: StoryType = {
  args: {
    moralityList: new MoralityList(['villain'])
  },
}

export const Gamut: StoryType = {
  render: () => (
    <List>
      {MORALITY_EXTENDED.map((morality) => (
        <ListItem key={morality}>
          <MoralityListIcons moralityList={new MoralityList([morality])}/> - {morality}
        </ListItem>
      ))}
    </List>
  )
}
