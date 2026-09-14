// noinspection JSUnusedGlobalSymbols

import FileImportResultSummary from './FileImportResultSummary.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof FileImportResultSummary> = {
  title: 'io/FileImportResultSummary',
  component: FileImportResultSummary
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    fileImportResults: [
      { file: { name: 'log.txt' } as File, accepted: true, tags: ['text', 'log'], characters: [{}] },
      { file: { name: 'characters.json.gz' } as File, accepted: true, tags: ['gzip', 'badger'], characters: [{}, {}, {}] },
      { file: { name: 'bob.txt' } as File, accepted: true, tags: ['v1', 'badger'], characters: [{}] },
      { file: { name: 'truncated.json' } as File, accepted: true, tags: ['json', 'error'], error: 'Unexpected character at...' },
      { file: { name: 'System 32' } as File, accepted: false, tags: ['unknown'] },
    ]
  }
}
