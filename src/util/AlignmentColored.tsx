import { Typography } from '@mui/joy'
import { FC, ReactNode } from 'react'
import { Alignment } from 'coh-content-db'

const AlignmentColored: FC<{ children: ReactNode, alignment?: Alignment }> = ({ children, alignment }) => {
  const color = function() {
    switch (alignment) {
      case 'H':
        return 'var(--alignment-hero)'
      case 'V':
        return 'var(--alignment-villain)'
      case 'P':
        return 'var(--alignment-praetorian)'
      default:
        return undefined
    }
  }()
  return (
    <Typography sx={{ color }}>{children}</Typography>
  )
}

export default AlignmentColored
