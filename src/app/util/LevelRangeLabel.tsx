import { FC } from 'react'
import { Chip } from '@mui/joy'
import { LevelRange } from 'coh-content-db'

const LevelRangeLabel: FC<{ value: LevelRange }> = ({ value }) => {
  const { min, max } = value

  return <Chip size="sm" color="neutral" title="Level range">
    Lvl {min}
    {max && min !== max && <>-{max}</>}
    {!max && '+'}
  </Chip>
}

export default LevelRangeLabel
