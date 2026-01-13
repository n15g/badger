// noinspection JSUnusedGlobalSymbols

import ImportCharactersModal from './ImportCharactersModal.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ImportCharactersModal> = {
  title: 'io/ImportCharactersModal',
  component: ImportCharactersModal
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    open: true
  }
}
