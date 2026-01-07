import { FC } from 'react'
import { Chip, ChipProps } from '@mui/joy'

const YesChip: FC<ChipProps> = ({ ...props }) => {
  return (
    <Chip
      {...props}
      color="success"
      sx={{ minWidth: '2em', textAlign: 'center' }}
    >
      Y
    </Chip>
  )
}

export default YesChip
