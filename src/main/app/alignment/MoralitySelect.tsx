import { FC } from 'react'
import { ListItemDecorator, Option, Select, SelectProps, Typography } from '@mui/joy'
import { SxProps } from '@mui/joy/styles/types'
import { Morality, MORALITY } from 'coh-content-db'
import MoralityIcon from './MoralityIcon.tsx'
import { Moralities } from './Moralities.tsx'

const MoralitySelect: FC<{ value?: string, onNewValue?: (value: Morality) => void, sx?: SxProps } & SelectProps<string, false>>
  = ({ value, onNewValue, sx, ...props }) => {

  return (
    <Select placeholder="Morality..."
            sx={sx}
            {...props}
            value={value ?? ''}
            onChange={(_, value) => {
              onNewValue?.(value as Morality)
            }}>
      {MORALITY.map((morality) => (
        <Option key={morality}
                value={morality}
                label={(
                  <Typography
                    startDecorator={<MoralityIcon morality={morality} style={{ height: '1.4em' }}/>}>
                    {Moralities.get(morality)}
                  </Typography>
                )}>
          <ListItemDecorator>
            <MoralityIcon morality={morality} style={{ height: '1.4em' }}/>
          </ListItemDecorator>
          {Moralities.get(morality)}
        </Option>
      ))}
    </Select>
  )
}

export default MoralitySelect
