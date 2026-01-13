// noinspection JSUnusedGlobalSymbols

import EditCharacterImportPlan from './EditCharacterImportPlan.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { TEST_CHARACTERS } from '../../storybook/storybook-content.ts'

const meta: Meta<typeof EditCharacterImportPlan> = {
  title: 'io/EditCharacterImportPlan',
  component: EditCharacterImportPlan,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {
  args: {
    value: {
      'new': { incoming: { 'name': 'New Char' }, action: 'new', existing: undefined },
      'match': { incoming: { 'name': 'Matched Char' }, action: 'merge', existing: TEST_CHARACTERS[1] },
      'replace': { incoming: { 'name': 'Replace This' }, action: 'replace', existing: TEST_CHARACTERS[3] },
      'ignore': { incoming: { 'name': 'Ignore This' }, action: 'ignore', existing: TEST_CHARACTERS[2] },
    },
    characters: TEST_CHARACTERS
  },
}

export const None_Found: StoryType = {
  args: {
    value: {}
  },
}
