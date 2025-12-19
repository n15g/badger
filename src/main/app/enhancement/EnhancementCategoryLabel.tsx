import { FC } from 'react'
import { EnhancementCategory } from 'coh-content-db'
import { Typography } from '@mui/joy'
import { EnhancementCategories } from './EnhacementCategories.tsx'

const StyledAlternate: FC<{ value: EnhancementCategory }> = ({ value }) => {
  return (
    <Typography component="span" display="inline" className={`enhancement ${value}`}
                title={EnhancementCategories.get(value)}>
      [{EnhancementCategories.get(value)}]
    </Typography>
  )
}

export default StyledAlternate
