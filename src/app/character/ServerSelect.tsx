import { FC } from 'react'
import { Autocomplete, AutocompleteProps } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import ContentProvider from '../content/ContentProvider.tsx'

const ServerSelect: FC<{
  value?: string,
  onNewValue?: (value: string) => void,
  sx?: SxProps
} & Omit<AutocompleteProps<string, false, false, true>, 'options'>>
  = ({
       value,
       onNewValue = () => {
         /* empty */
       },
       sx, ...props
     }) => {
  const content = ContentProvider.useContent()

  return (
    <Autocomplete freeSolo
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  sx={sx}
                  {...props}
                  value={value ?? ''}
                  onChange={(_, value) => {
                    onNewValue(value ?? '')
                  }}
                  options={content.servers}>
    </Autocomplete>
  )
}

export default ServerSelect
