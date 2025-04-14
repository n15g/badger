import { Typography } from '@mui/joy'
import { FC, ReactNode } from 'react'
import { Alignment } from 'coh-content-db'

const AlignmentColored: FC<{ children: ReactNode, alignment?: Alignment }> = ({ children, alignment }) => {
  return (
    <Typography className={`morality ${alignment ?? ''}`}>{children}</Typography>
  )
}

export default AlignmentColored
