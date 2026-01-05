import { FC, KeyboardEvent, RefObject, useMemo, useState } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, AutocompleteOption, Chip, ChipDelete, ListItemDecorator, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { BadgeSortOptions } from './BadgeSortOptions.tsx'
import { produce } from 'immer'

const sortFields = BadgeSortOptions

const BadgeSortChip: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {
  const [open, setOpen] = useState(false)

  const value = searchOptions.sort

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.sort = undefined
        }))
      }}
    >
      <Icons.Cross/>
    </ChipDelete>
  ), [onChange, searchOptions])
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={value ? 'primary' : undefined} endDecorator={value ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            {value ? (sortFields.get(value)?.asc ? <Icons.Asc/> : <Icons.Desc/>) : <Icons.Sort/>}
            {sortFields.get(value)?.label}
          </Stack>
        </Chip>
      } nativeButton={false}/>
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
                onChange?.(produce(searchOptions, (draft) => {
                  draft.sort = value ?? undefined
                }))
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={sortFields.keys}
              groupBy={(x) => sortFields.get(x)?.label ?? ''}
              renderTags={() => null}
              renderOption={(props, option) => (
                // eslint-disable-next-line react-x/jsx-key-before-spread
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

export default BadgeSortChip
