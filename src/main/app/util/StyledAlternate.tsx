import { FC } from 'react'
import { AlternateData } from 'coh-content-db'
import { Icons } from './Icons.tsx'
import { Typography } from '@mui/joy'
import MoralityColored from '../alignment/MoralityColored.tsx'

const StyledAlternate: FC<{ value: AlternateData<string> }> = ({ value }) => {
  const { sex, value: text, alignment } = value
  let decorator = undefined

  if (sex === 'M') {
    decorator = <Icons.Male/>
  } else if (sex === 'F') {
    decorator = <Icons.Female/>
  }

  return <>
    <Typography>
      <MoralityColored morality={alignment}>{text}</MoralityColored>
      {decorator && <sup style={{ fontSize: '0.7em' }}>{decorator}</sup>}
    </Typography>
  </>
}

export default StyledAlternate
