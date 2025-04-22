import { FC, KeyboardEvent, RefObject, useState } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import ContentProvider from '../../content/ContentProvider.tsx'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, Chip, ChipDelete, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'

interface Props {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const BadgeMapFilterChip: FC<Props> = ({ searchOptions, onChange }) => {
  const content = ContentProvider.useContent()

  const zones = content.zones
  const zone = content.getZone(searchOptions.filter?.zoneKey) ?? null

  const [open, setOpen] = useState(false)

  const Clear = (<ChipDelete onClick={() => {
    onChange?.({ ...searchOptions, ...{ filter: { zoneKey: undefined } } })
  }}><Icons.Cross/></ChipDelete>)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={zone ? 'primary' : undefined} endDecorator={zone ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icons.Zone/>
            {zone?.name}
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
              value={zone}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, zone) => {
                onChange?.({ ...searchOptions, ...{ filter: { zoneKey: zone?.key } } })
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

export default BadgeMapFilterChip
