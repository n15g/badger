import { FC } from 'react'
import { BadgeQueryableField, BadgeSearchOptions } from 'coh-content-db'
import { Chip, ListItemDecorator, Option, Select, Stack } from '@mui/joy'
import { BiCheck } from 'react-icons/bi'
import { BADGE_QUERYABLE_FIELD_LABELS } from './badge-queryable-field-labels.ts'
import { MdSearch } from 'react-icons/md'

const selectOptions = BADGE_QUERYABLE_FIELD_LABELS

interface BadgeSearchBarProps {
  searchOptions: BadgeSearchOptions,
  onChange?: (options: BadgeSearchOptions) => void,
}

const BadgeSearchFieldChip: FC<BadgeSearchBarProps> = ({ searchOptions, onChange }) => {
  const values: BadgeQueryableField [] = searchOptions.query?.fields ?? ['name']

  return (
    <Chip
      placeholder={<ChipLabel values={values}/>}
      value={values}
      multiple={true}
      indicator={null}
      component={Select}
      color={values.length === 0 ? 'neutral' : 'primary'}
      size="sm"
      onChange={(_, newValue) => {
        onChange?.({
          ...searchOptions, query: {
            ...searchOptions.query,
            fields: newValue as BadgeQueryableField[]
          }
        })
      }}
      renderValue={() => (<ChipLabel values={values}/>)}
    >
      {selectOptions.entries.map(([val, label]) => (
        <Option key={val} value={val}>
          <ListItemDecorator>
            {values.includes(val) && <BiCheck/>}
          </ListItemDecorator>
          {label}
        </Option>
      ))}
    </Chip>
  )
}

const ChipLabel: FC<{ values: BadgeQueryableField[] }> = ({ values }) => {
  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <MdSearch/>
      {values.length === 0 && 'Nothing'}
      {values.length === 1 && selectOptions.get(values[0])}
      {values.length > 1 && `${values.length.toString()} Fields`}
    </Stack>
  )
}

export default BadgeSearchFieldChip
