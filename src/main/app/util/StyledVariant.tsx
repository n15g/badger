import { FC } from 'react'
import { Icons } from './Icons.tsx'
import MoralityColored from '../morality/MoralityColored.tsx'
import { VariantData } from 'coh-content-db'

const StyledVariant: FC<{ value?: VariantData<string> }> = ({ value }) => {
  if (!value) {
    return
  }

  const { sex, value: text, alignment } = value
  let decorator = undefined

  if (sex === 'M') {
    decorator = <Icons.Male/>
  } else if (sex === 'F') {
    decorator = <Icons.Female/>
  }

  return (
    <span>
      <MoralityColored morality={alignment}>{text}</MoralityColored>
      {decorator && <sup style={{ fontSize: '0.7em' }}>{decorator}</sup>}
    </span>
  )
}

export default StyledVariant
