import { FC, KeyboardEvent, RefObject, useMemo, useState } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import ContentProvider from '../../content/ContentProvider.tsx'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, Chip, ChipDelete, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { produce } from 'immer'

const BadgeFilterMapChip: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {
  const content = ContentProvider.useContent()

  const zones = content.zones
  const zone = content.getZone(searchOptions.filter?.zoneKey) ?? null

  const [open, setOpen] = useState(false)

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.filter ??= {}
          draft.filter.zoneKey = undefined
        }))
      }}
    >
      <Icons.Cross/>
    </ChipDelete>
  ), [onChange, searchOptions])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={zone ? 'primary' : undefined} endDecorator={zone ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icons.Zone/>
            {zone?.name}
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
              value={zone}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, zone) => {
                onChange?.(produce(searchOptions, (draft) => {
                  draft.filter ??= {}
                  draft.filter.zoneKey = zone?.key
                }))
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={zones}
              getOptionLabel={(zone) => zone.name}
              getOptionKey={(zone) => zone.key}
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

export default BadgeFilterMapChip
