import { FC, ReactNode } from 'react'
import { Alignment, Morality } from 'coh-content-db'

const MoralityColored: FC<{ children: ReactNode, morality?: Alignment | Morality }> = ({ children, morality }) => {
  return (
    <span className={`morality ${morality ?? ''}`}>{children}</span>
  )
}

export default MoralityColored
