import { IconButton, Input, Stack } from '@mui/joy'
import { BadgeSearchOptions } from 'coh-content-db'
import { FC } from 'react'
import { MdClear } from 'react-icons/md'
import BadgeSearchFieldChip from './BadgeSearchFieldChip.tsx'

interface BadgeSearchBarProps {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const defaultSearch: BadgeSearchOptions = {
  query: { str: '', fields: ['name'] },
  pageSize: 8
}

const BadgeSearchBar: FC<BadgeSearchBarProps> & { defaultSearch: BadgeSearchOptions } = ({ searchOptions, onChange }) => {
  return (
    <Input placeholder="Search"
           sx={{ maxWidth: 480, minWidth: 2 }}
           value={searchOptions.query?.str}
           onChange={(event) => {
             onChange?.({ ...searchOptions, query: { ...searchOptions.query, str: event.target.value } })
           }}
           endDecorator={
             <Stack direction="row" gap={1} alignItems="center">
               <BadgeSearchFieldChip searchOptions={searchOptions} onChange={onChange}/>
               <ResetButton onClick={() => {
                 onChange?.({ ...searchOptions, query: { ...defaultSearch.query }, filter: { ...defaultSearch.filter } })
               }}/>
             </Stack>
           }
    >
    </Input>
  )
}

BadgeSearchBar.defaultSearch = defaultSearch

const ResetButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <IconButton title="Reset" aria-label="Reset" onClick={onClick}>
      <MdClear/>
    </IconButton>
  )
}

export default BadgeSearchBar
