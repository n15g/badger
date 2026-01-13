// noinspection JSUnusedGlobalSymbols

import ImportTagList from './ImportTagList.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { IMPORT_TAG } from './import-tag.ts'

const meta: Meta<typeof ImportTagList> = {
  title: 'io/ImportTagList',
  component: ImportTagList
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {
  args: {
    value: ['gzip', 'json', 'badger']
  }
}

export const Undefined: StoryType = {}

export const All: StoryType = {
  args: {
    value: [...IMPORT_TAG]
  }
}
