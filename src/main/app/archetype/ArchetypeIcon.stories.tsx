// noinspection JSUnusedGlobalSymbols

import ArchetypeIcon from './ArchetypeIcon.tsx'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'

const meta: Meta<typeof ArchetypeIcon> = {
  title: 'archetype/ArchetypeIcon',
  component: ArchetypeIcon,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Blaster: StoryType = {
  args: {
    archetypeKey: 'blaster'
  },
}

export const Unknown: StoryType = {
  args: {
    archetypeKey: 'unknown'
  },
}

export const All: StoryType = {
  render: () => (
    <List>
      {STORYBOOK_CONTENT.archetypes.map((archetype) => (
        <ListItem key={archetype.key}><ArchetypeIcon archetypeKey={archetype.key}/></ListItem>
      ))}
    </List>
  )
}
