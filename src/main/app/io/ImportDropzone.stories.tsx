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
    onFiles: (files) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          alert(`${files.length} files`)
          resolve()
        }, 2000)
      })
    }
  }
}
