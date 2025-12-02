// noinspection JSUnusedGlobalSymbols

import BadgeSearchBar from './BadgeSearchBar.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof BadgeSearchBar> = {
  title: 'badge/BadgeSearchBar',
  component: BadgeSearchBar,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Defaults: StoryType = {
  args: {
    searchOptions: BadgeSearchBar.defaultSearch
  },
}

export const NoFields: StoryType = {
  args: {
    searchOptions: { query: { fields: [] } }
  },
}

export const NameSearch: StoryType = {
  args: {
    searchOptions: { query: { str: 'Test', fields: ['name'] } }
  },
}

export const AllFilters: StoryType = {
  args: {
    searchOptions: {
      query: { str: 'Test', fields: ['set-title-id'] },
      filter: {
        zoneKey: 'echo-rikti-crash-site',
        type: 'exploration',
        morality: 'resistance',
      },
      sort: 'release-date.desc',
    }
  },
}

export const Long_man: StoryType = {
  parameters: {
    xl: true,
  },
  args: {
    searchOptions: {},
  },
}
