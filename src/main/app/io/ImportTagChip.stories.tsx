// noinspection JSUnusedGlobalSymbols

import ImportTagChip from './ImportTagChip.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'
import { IMPORT_TAG } from './import-tag.ts'

const meta: Meta<typeof ImportTagChip> = {
  title: 'io/ImportTagChip',
  component: ImportTagChip
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Gzip: StoryType = {
  args: {
    value: 'gzip'
  }
}

export const Undefined: StoryType = {}

export const All: StoryType = {
  render: () => (
    <List>
      {IMPORT_TAG.map((tag) => (
        <ListItem key={tag}><ImportTagChip value={tag}/></ListItem>
      ))}
    </List>
  )
}
