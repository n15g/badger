import { FC } from 'react'
import { Chip, ChipProps } from '@mui/joy'

const NoChip: FC<ChipProps> = ({ ...props }) => {
  return (
    <Chip
      {...props}
      color="danger"
      sx={{ minWidth: '2em', textAlign: 'center' }}
    >
      N
    </Chip>
  )
}

export default NoChip
