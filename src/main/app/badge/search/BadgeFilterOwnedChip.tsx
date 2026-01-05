import { FC } from 'react'
import { BadgeSearchOptions } from 'coh-content-db'
import { Chip, Tooltip } from '@mui/joy'
import { TbEyeCheck } from 'react-icons/tb'
import { produce } from 'immer'
import CharacterContextProvider from '../../character/CharacterContextProvider.tsx'
import { BadgeSearchOptionsEx } from './badge-search-options-ex.ts'

interface Props {
  searchOptions: BadgeSearchOptionsEx,
  onChange?: (options: BadgeSearchOptions) => void,
}

const BadgeFilterOwnedChip: FC<Props> = ({ searchOptions, onChange }) => {
  const { character } = CharacterContextProvider.useCharacterContext()
  const checked = searchOptions.filter?.owned ?? false

  return character ? (
    <Tooltip title="Hide owned badges" enterDelay={300}>
      <Chip
        color={checked ? 'primary' : undefined}
        onClick={() => {
          onChange?.(produce(searchOptions, (draft) => {
            draft.filter ??= {}
            draft.filter.owned = !checked
          }))
        }}
      >
        <TbEyeCheck/>
      </Chip>
    </Tooltip>
  ) : undefined
}

export default BadgeFilterOwnedChip
