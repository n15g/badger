import { FC } from 'react'
import { Chip, ChipProps } from '@mui/joy'
import { Icons } from './Icons.tsx'

const CrossChip: FC<ChipProps> = ({ ...props }) => {
  return (
    <Chip
      color="danger"
      variant="solid"
      {...props}
      sx={{ minWidth: '2em', textAlign: 'center' }}
    >
      <Icons.Cross style={{ position: 'relative', top: '0.1em' }}/>
    </Chip>
  )
}

export default CrossChip
