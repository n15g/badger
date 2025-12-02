import { FC } from 'react'
import { AlternateData } from 'coh-content-db'
import { Icons } from './Icons.tsx'
import { Typography } from '@mui/joy'
import MoralityColored from '../alignment/MoralityColored.tsx'

const StyledAlternate: FC<{ value?: AlternateData<string> }> = ({ value }) => {
  return <>
    <Typography startDecorator={Icons.forSex(value?.sex)}>
      <MoralityColored morality={value?.alignment}>{value?.value ?? 'Unknown'}</MoralityColored>
    </Typography>
  </>
}

export default StyledAlternate
