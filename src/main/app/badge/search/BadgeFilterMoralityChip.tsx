import { FC, KeyboardEvent, RefObject, useMemo, useState } from 'react'
import { BadgeSearchOptions, MORALITY } from 'coh-content-db'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, AutocompleteOption, Chip, ChipDelete, ListItemDecorator, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import MoralityColored from '../../morality/MoralityColored.tsx'
import { MoralityLabels } from '../../morality/MoralityLabels.tsx'
import MoralityIcon from '../../morality/MoralityIcon.tsx'
import { produce } from 'immer'

const BadgeFilterMoralityChip: FC<{
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}> = ({ searchOptions, onChange }) => {
  const morality = searchOptions.filter?.morality ?? undefined

  const [open, setOpen] = useState(false)

  const Clear = useMemo(() => (
    <ChipDelete
      onClick={() => {
        onChange?.(produce(searchOptions, (draft) => {
          draft.filter ??= {}
          draft.filter.morality = undefined
        }))
      }}
    >
      <Icons.Cross/>
    </ChipDelete>
  ), [onChange, searchOptions])

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={morality ? 'primary' : undefined} endDecorator={morality ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icons.Morality/>
            {MoralityLabels.get(morality)}
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
              value={morality ?? null}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, value) => {
                onChange?.(produce(searchOptions, (draft) => {
                  draft.filter ??= {}
                  draft.filter.morality = value ?? undefined
                }))
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={MORALITY}
              renderOption={(props, morality) => (
                // eslint-disable-next-line react-x/jsx-key-before-spread
                <AutocompleteOption {...props} key={morality}>
                  <ListItemDecorator>
                    <MoralityIcon morality={morality} style={{ height: '1.2em' }}/>
                  </ListItemDecorator>
                  <MoralityColored morality={morality}>{MoralityLabels.get(morality)}</MoralityColored>
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

export default BadgeFilterMoralityChip
