import { FC } from 'react'
import { ListItemDecorator, Option, Select, SelectProps, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import ContentProvider from '../content/ContentProvider.tsx'
import ArchetypeIcon from './ArchetypeIcon.tsx'

const ArchetypeSelect: FC<{ value?: string, onNewValue?: (value: string) => void, sx?: SxProps } & SelectProps<string, false>>
  = ({
       value,
       onNewValue = () => {
         /* empty */
       },
       sx, ...props
     }) => {
  const content = ContentProvider.useContent()

  return (
    <Select placeholder="Archetype..."
            sx={sx}
            {...props}
            value={value ?? ''}
            onChange={(_, value) => {
              onNewValue(value ?? '')
            }}>
      {content.archetypes.map((archetype) => (
        <Option key={archetype.key}
                value={archetype.key}
                label={(
                  <Typography
                    startDecorator={<ArchetypeIcon archetypeKey={archetype.key} height="1.4em"/>}>
                    {archetype.name}
                  </Typography>
                )}>
          <ListItemDecorator>
            <ArchetypeIcon archetypeKey={archetype.key} height="1.4em"/>
          </ListItemDecorator>
          {archetype.name}
        </Option>
      ))}
    </Select>
  )
}

export default ArchetypeSelect
