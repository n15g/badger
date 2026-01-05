import { FC, KeyboardEvent, RefObject, useMemo, useState } from 'react'
import { BadgeQueryableField, BadgeSearchOptions } from 'coh-content-db'
import { Autocomplete, AutocompleteListbox, AutocompleteOption, Chip, ChipDelete, ListItemDecorator, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { Popover } from '@base-ui-components/react'
import { BadgeQueryableFields } from './BadgeQueryableFields.tsx'
import { produce } from 'immer'

const selectOptions = BadgeQueryableFields

const BadgeSearchFieldChip: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {
  const values: BadgeQueryableField [] = searchOptions.query?.fields ?? ['name']

  const isActive = !!values.length
  const isDefault = values.length === 1 && values[0] === 'name'

  const [open, setOpen] = useState(false)

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.query ??= {}
          draft.query.fields = ['name']
        }))
      }}
    >
      <Icons.Cross/>
    </ChipDelete>
  ), [onChange, searchOptions])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={isActive ? 'primary' : undefined}
              endDecorator={isDefault ? null : Clear}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icons.Search/>
            {values.length === 0 && 'Nothing'}
            {values.length === 1 && selectOptions.get(values[0])}
            {values.length > 1 && `${values.length.toString()} Fields`}
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
              multiple
              autoComplete
              disableClearable
              forcePopupIcon={false}
              renderTags={() => null}
              value={values}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, newValue) => {
                onChange?.(produce(searchOptions, (draft) => {
                  draft.query ??= {}
                  draft.query.fields = newValue as BadgeQueryableField[]
                }))
              }}
              slots={{
                listbox: ListBox
              }}
              options={selectOptions.keys}
              renderOption={(props, option, { selected }) => (
                // eslint-disable-next-line react-x/jsx-key-before-spread
                <AutocompleteOption {...props} key={option}>
                  <ListItemDecorator>{selected && <Icons.Check/>}</ListItemDecorator>
                  {selectOptions.get(option)}
                </AutocompleteOption>
              )}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default BadgeSearchFieldChip

const ListBox = ({ ref, ...props }: object & { ref?: RefObject<HTMLUListElement | null> }) => (
  <AutocompleteListbox
    ref={ref}
    {...props}
    variant="plain"
    size="sm"
  />
)
