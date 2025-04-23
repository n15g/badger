import { FC, KeyboardEvent, RefObject, useState } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, AutocompleteOption, Chip, ChipDelete, ListItemDecorator, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { BadgeSortOptions } from './BadgeSortOptions.tsx'

interface Props {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const sortFields = BadgeSortOptions

const BadgeMapFilterChip: FC<Props> = ({ searchOptions, onChange }) => {
  const [open, setOpen] = useState(false)

  const value = searchOptions.sort

  const Clear = (<ChipDelete onClick={() => {
    onChange?.({ ...searchOptions, sort: undefined })
  }}><Icons.Cross/></ChipDelete>)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={value ? 'primary' : undefined} endDecorator={value ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            {value ? (sortFields.get(value)?.asc ? <Icons.Asc/> : <Icons.Desc/>) : <Icons.Sort/>}
            {sortFields.get(value)?.label}
          </Stack>
        </Chip>
      }/>
      <Popover.Portal>
        <Popover.Positioner sideOffset={2}>
          <Popover.Popup render={<Sheet variant="outlined" sx={{ p: 1 }}/>}>
            <Autocomplete
              open
              autoFocus
              autoHighlight
              autoComplete
              forcePopupIcon={false}
              value={value ?? null}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, value) => {
                onChange?.({ ...searchOptions, sort: value ?? undefined })
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={sortFields.keys}
              groupBy={(x) => sortFields.get(x)?.label ?? ''}
              renderTags={() => null}
              getOptionLabel={(zone) => sortFields.get(zone)?.label ?? ''}
              renderOption={(props, option) => (
                <AutocompleteOption {...props} key={option}>
                  <ListItemDecorator>
                    {sortFields.get(option)?.asc ? <Icons.Asc/> : <Icons.Desc/>}
                  </ListItemDecorator>
                  {sortFields.get(option)?.label} {sortFields.get(option)?.asc ? 'Asc' : 'Desc'}
                </AutocompleteOption>
              )}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

const ListBox = ({ ref, ...props }: object & { ref?: RefObject<HTMLUListElement | null> }) => (
  <AutocompleteListbox
    ref={ref}
    {...props}
    variant="plain"
    size="sm"
  />
)

export default BadgeMapFilterChip
