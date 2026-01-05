import { FC, KeyboardEvent, RefObject, useMemo, useState } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, Chip, ChipDelete, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { BadgeTypeLabels } from '../BadgeTypeLabels.tsx'
import { produce } from 'immer'

const BadgeFilterTypeChip: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {
  const options = BadgeTypeLabels.keys
  const value = searchOptions.filter?.type ?? null

  const [open, setOpen] = useState(false)

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.filter ??= {}
          draft.filter.type = undefined
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
            <Icons.Badge/>
            {value ? BadgeTypeLabels.get(value) : null}
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
              value={value}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, value) => {
                onChange?.(produce(searchOptions, (draft) => {
                  draft.filter ??= {}
                  draft.filter.type = value ?? undefined
                }))
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={options}
              getOptionLabel={(value) => BadgeTypeLabels.get(value) ?? '?'}
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

export default BadgeFilterTypeChip
