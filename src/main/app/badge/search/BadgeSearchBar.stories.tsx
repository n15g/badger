// noinspection JSUnusedGlobalSymbols

import BadgeSearchBar from './BadgeSearchBar.tsx'


export default {
  title: 'badge/BadgeSearchBar',
  component: BadgeSearchBar,
}

export const Defaults = {
  args: {
    searchOptions: BadgeSearchBar.defaultSearch
  },
}

export const NoFields = {
  args: {
    searchOptions: { query: { fields: [] } }
  },
}

export const NameSearch = {
  args: {
    searchOptions: { query: { str: 'Test', fields: ['name'] } }
  },
}

export const Long_man = {
  parameters: {
    xl: true,
  },
  args: {
    searchOptions: {},
  },
}
