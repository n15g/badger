import { FC, KeyboardEvent, RefObject, useState } from 'react'
import { BadgeSearchOptions, Morality } from 'coh-content-db'
import { Popover } from '@base-ui-components/react'
import { Autocomplete, AutocompleteListbox, AutocompleteOption, Chip, ChipDelete, ListItemDecorator, Sheet, Stack } from '@mui/joy'
import { Icons } from '../../util/Icons.tsx'
import { TypedIndex } from '../../util/typed-index.ts'
import DropShadowImage from '../../util/DropShadowImage.tsx'
import heroIcon from '../../../resources/images/icon/morality-hero.png'
import vigilanteIcon from '../../../resources/images/icon/morality-vigilante.png'
import villainIcon from '../../../resources/images/icon/morality-villain.png'
import rogueIcon from '../../../resources/images/icon/morality-rogue.png'
import resistanceIcon from '../../../resources/images/icon/morality-resistance.png'
import loyalistIcon from '../../../resources/images/icon/morality-loyalist.png'
import MoralityColored from '../../alignment/MoralityColored.tsx'

interface Props {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const options = new TypedIndex<Morality, { key: Morality, label: string, icon: string }>({
  'hero': { key: 'hero', label: 'Hero', icon: heroIcon },
  'vigilante': { key: 'vigilante', label: 'Vigilante', icon: vigilanteIcon },
  'villain': { key: 'villain', label: 'Villain', icon: villainIcon },
  'rogue': { key: 'rogue', label: 'Rogue', icon: rogueIcon },
  'resistance': { key: 'resistance', label: 'Resistance', icon: resistanceIcon },
  'loyalist': { key: 'loyalist', label: 'Loyalist', icon: loyalistIcon },
})

const BadgeMapFilterChip: FC<Props> = ({ searchOptions, onChange }) => {
  const value = options.get(searchOptions.filter?.morality) ?? null

  const [open, setOpen] = useState(false)

  const Clear = (<ChipDelete onClick={() => {
    onChange?.({ ...searchOptions, filter: { ...searchOptions.filter, morality: undefined } })
  }}><Icons.Cross/></ChipDelete>)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger render={
        <Chip color={value ? 'primary' : undefined} endDecorator={value ? Clear : null}>
          <Stack direction="row" gap={0.5} alignItems="center">
            <Icons.Morality/>
            {value?.label}
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
              value={value}
              onKeyDown={(event) => {
                if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Escape')) {
                  setOpen(false)
                }
              }}
              onChange={(_, value) => {
                onChange?.({ ...searchOptions, filter: { ...searchOptions.filter, morality: value?.key ?? undefined } })
                setOpen(false)
              }}
              slots={{
                listbox: ListBox
              }}
              options={options.values}
              getOptionKey={(x) => x.key}
              renderOption={(props, option) => (
                <AutocompleteOption {...props} key={option.key}>
                  <ListItemDecorator>
                    <DropShadowImage src={option.icon}
                                     shadowSize="3px"
                                     width={16}
                                     alt={option.label}/>
                  </ListItemDecorator>
                  <MoralityColored morality={option.key}>{option.label}</MoralityColored>
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
