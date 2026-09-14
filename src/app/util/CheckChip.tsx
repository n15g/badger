import { FC } from 'react'
import { Chip, ChipProps } from '@mui/joy'
import { Icons } from './Icons.tsx'

const CheckChip: FC<ChipProps> = ({ ...props }) => {
  return (
    <Chip
      color="success"
      variant="solid"
      {...props}
      sx={{ textAlign: 'center' }}
    >
      <Icons.Check style={{ position: 'relative', top: '0.1em' }}/>
    </Chip>
  )
}

export default CheckChip
