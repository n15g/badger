import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'
import StyledAlternate from '../util/StyledAlternate.tsx'


const BadgeNameInline: FC<{ badge: Badge }> =
  ({ badge }) => {
    return (
      <Typography component="span" display="inline" className="entity">
        {badge.name.canonical.map((name, index) =>
          <span key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`}>
            {index > 0 && <span style={{ padding: '0.25em' }}>/</span>}
            <StyledAlternate value={name}/>
          </span>
        )}
      </Typography>
    )
  }

export default BadgeNameInline
