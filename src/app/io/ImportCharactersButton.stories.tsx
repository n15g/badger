// noinspection JSUnusedGlobalSymbols

import ImportCharactersButton from './ImportCharactersButton.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ImportCharactersButton> = {
  title: 'io/ImportCharactersButton',
  component: ImportCharactersButton
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {}
