// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import ImportCharactersModal from './ImportCharactersModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ImportCharactersModal> = {
  title: 'io/ImportCharactersModal',
  component: ImportCharactersModal,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    open: true
  }
}
