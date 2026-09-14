// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import ImportCharactersButton from './ImportCharactersButton.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ImportCharactersButton> = {
  title: 'io/ImportCharactersButton',
  component: ImportCharactersButton,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {}
