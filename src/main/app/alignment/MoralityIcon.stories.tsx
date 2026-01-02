// noinspection JSUnusedGlobalSymbols

import MoralityIcon from './MoralityIcon.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'
import { MORALITY } from 'coh-content-db'

const meta: Meta<typeof MoralityIcon> = {
  title: 'alignment/MoralityIcon',
  component: MoralityIcon,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Vigilante: StoryType = {
  args: {
    morality: 'vigilante'
  },
}

export const All: StoryType = {
  render: () => (
    <List>
      {MORALITY.map((morality) => (
        <ListItem key={morality}>
          <MoralityIcon morality={morality}/> - {morality}
        </ListItem>
      ))}
    </List>
  )
}
