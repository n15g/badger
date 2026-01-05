import { Stack } from '@mui/joy'
import { BadgeSearchOptions } from 'coh-content-db'
import { FC } from 'react'
import BadgeSearchFieldChip from './BadgeSearchFieldChip.tsx'
import BadgeFilterMapChip from './BadgeFilterMapChip.tsx'
import BadgeSearchText from './BadgeSearchText.tsx'
import BadgeFilterTypeChip from './BadgeFilterTypeChip.tsx'
import BadgeFilterMoralityChip from './BadgeFilterMoralityChip.tsx'
import BadgeFilterOwnedChip from './BadgeFilterOwnedChip.tsx'
import BadgeSortChip from './BadgeSortChip.tsx'
import { BadgeSearchOptionsEx } from './badge-search-options-ex.ts'

interface BadgeSearchBarProps {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const defaultSearch: BadgeSearchOptionsEx = {
  query: { str: '', fields: ['name'] },
  pageSize: 20
}

const BadgeSearchBar: FC<BadgeSearchBarProps> & { defaultSearch: BadgeSearchOptions } = ({ searchOptions, onChange }) => {
  return (
    <Stack direction="column" gap={1} sx={{ mb: 2 }}>
      <BadgeSearchText {...{ searchOptions, onChange }}/>
      <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
        <BadgeSearchFieldChip {...{ searchOptions, onChange }}/>
        <BadgeFilterTypeChip {...{ searchOptions, onChange }}/>
        <BadgeFilterMoralityChip {...{ searchOptions, onChange }}/>
        <BadgeFilterMapChip {...{ searchOptions, onChange }}/>
        <BadgeFilterOwnedChip {...{ searchOptions, onChange }}/>
        <BadgeSortChip {...{ searchOptions, onChange }}/>
      </Stack>
    </Stack>
  )
}

BadgeSearchBar.defaultSearch = defaultSearch
export default BadgeSearchBar
