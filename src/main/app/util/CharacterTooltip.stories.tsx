// noinspection JSUnusedGlobalSymbols

import CharacterTooltip from './CharacterTooltip.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Typography } from '@mui/joy'
import { Character } from '../character/character.ts'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof CharacterTooltip> = {
  title: 'Character/CharacterTooltip',
  component: CharacterTooltip,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const TEST_CHARACTER: Character = {
  key: 'test',
  name: 'Test Character',
  server: 'Torchbearer',
  morality: 'rogue',
  archetypeKey: 'mastermind',
  badges: { 'hangman': { owned: true } }
}

export const Default: StoryType = {
  args: {
    character: TEST_CHARACTER,
    children: <Box/>,
    open: true,
  },
}

export const Popup: StoryType = {
  args: {
    character: TEST_CHARACTER,
    children: <Typography>Hover me</Typography>,
  },
}

console.log(STORYBOOK_CONTENT.badges.filter(x => x.ignoreInTotals))
