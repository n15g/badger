// noinspection JSUnusedGlobalSymbols

import MoralityIcon from './MoralityIcon.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'
import { MORALITY } from 'coh-content-db'

const meta: Meta<typeof MoralityIcon> = {
  title: 'morality/MoralityIcon',
  component: MoralityIcon,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Vigilante: StoryType = {
  args: {
    morality: 'vigilante'
  },
}

export const Muted: StoryType = {
  args: {
    morality: 'vigilante',
    muted: true
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
