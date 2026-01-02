import { Input, Stack } from '@mui/joy'
import { BadgeSearchOptions } from 'coh-content-db'
import { FC } from 'react'
import BadgeSearchFieldChip from './BadgeSearchFieldChip.tsx'
import BadgeMapFilterChip from './BadgeMapFilterChip.tsx'
import BadgeTypeFilterChip from './BadgeTypeFilterChip.tsx'
import BadgeMoralityFilterChip from './BadgeMoralityFilterChip.tsx'
import BadgeSortFilterChip from './BadgeSortFilterChip.tsx'

interface BadgeSearchBarProps {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const defaultSearch: BadgeSearchOptions = {
  query: { str: '', fields: ['name'] },
  pageSize: 20
}

const BadgeSearchBar: FC<BadgeSearchBarProps> & { defaultSearch: BadgeSearchOptions } = ({ searchOptions, onChange }) => {
  return (
    <Stack direction="column" gap={1} sx={{ mb: 2 }}>
      <Input placeholder="Search"
             sx={{ maxWidth: 480 }}
             value={searchOptions.query?.str}
             onChange={(event) => {
               onChange?.({ ...searchOptions, ...{ query: { str: event.target.value } } })
             }}
      />
      <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
        <BadgeSearchFieldChip {...{ searchOptions, onChange }}/>
        <BadgeTypeFilterChip {...{ searchOptions, onChange }}/>
        <BadgeMoralityFilterChip {...{ searchOptions, onChange }}/>
        <BadgeMapFilterChip {...{ searchOptions, onChange }}/>
        <BadgeSortFilterChip {...{ searchOptions, onChange }}/>
      </Stack>
    </Stack>
  )
}

BadgeSearchBar.defaultSearch = defaultSearch
export default BadgeSearchBar
