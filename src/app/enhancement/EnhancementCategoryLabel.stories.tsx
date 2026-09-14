// noinspection JSUnusedGlobalSymbols

import EnhancementCategoryLabel from './EnhancementCategoryLabel.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { List, ListItem } from '@mui/joy'
import { EnhancementCategories } from './EnhacementCategories.tsx'

const meta: Meta<typeof EnhancementCategoryLabel> = {
  title: 'enhancement/EnhancementCategoryLabel',
  component: EnhancementCategoryLabel,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Damage: StoryType = {
  args: {
    value: 'damage'
  },
}

export const All: StoryType = {
  render: () => (
    <List>
      {EnhancementCategories.keys.map((key) => (
        <ListItem key={key}>
          <EnhancementCategoryLabel value={key}/>
        </ListItem>
      ))}
    </List>
  )
}
