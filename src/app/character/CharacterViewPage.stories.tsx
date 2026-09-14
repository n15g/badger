// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import CharacterViewPage from './CharacterViewPage.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof CharacterViewPage> = {
  title: 'character/CharacterViewPage',
  component: CharacterViewPage,
  parameters: storyParameters({ characters: TEST_CHARACTERS, initialRoute: '/characters/test1' }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    character: TEST_CHARACTERS[0]
  },
}
