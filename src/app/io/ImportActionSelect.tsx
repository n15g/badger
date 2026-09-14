import { FC } from 'react'
import { Option, Select, SelectProps } from '@mui/joy'
import { TypedIndex } from '../util/typed-index.ts'
import { ImportAction } from './import-action.ts'

const ACTIONS = new TypedIndex<ImportAction, string>({
  'new': 'New',
  'replace': 'Replace',
  'merge': 'Merge',
  'ignore': 'Ignore',
})

const ImportActionSelect: FC<{
  value: ImportAction,
  onNewValue?: (value: ImportAction) => void,
} & Omit<SelectProps<ImportAction, false>, 'options'>>
  = ({
       value,
       onNewValue,
       ...props
     }) => {

  return (
    <Select {...props}
            value={value}
            onChange={(_, value) => {
              onNewValue?.(value ?? 'new')
            }}>
      {ACTIONS.entries.map(([key, value]) => (
        <Option key={key}
                value={key}
                label={value}>
          {value}
        </Option>
      ))}
    </Select>
  )
}

export default ImportActionSelect
