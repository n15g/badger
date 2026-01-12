// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from '@storybook/react-vite'
import ImportDropzone from './ImportDropzone.tsx'

const meta: Meta<typeof ImportDropzone> = {
  title: 'io/ImportDropZone',
  component: ImportDropzone
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    onParse: (files) => {
      alert(`${files.length} files`)
    }
  }
}
