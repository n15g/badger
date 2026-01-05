import { FC, useMemo } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import { ChipDelete, Input } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { produce } from 'immer'

const BadgeSearchText: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.query ??= {}
          draft.query.str = undefined
        }))
      }}
    >
      <Icons.Cross/>
    </ChipDelete>
  ), [onChange, searchOptions])

  return (
    <Input
      placeholder="Search"
      sx={{ maxWidth: 480 }}
      value={searchOptions.query?.str ?? ''}
      onChange={(event) => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.query ??= {}
          draft.query.str = event.target.value
        }))
      }}
      endDecorator={searchOptions.query?.str ? Clear : undefined}
    />
  )
}

export default BadgeSearchText
