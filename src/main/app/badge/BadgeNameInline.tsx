import { FC } from 'react'
import { Badge, VariantContext } from 'coh-content-db'
import { Typography } from '@mui/joy'
import StyledVariant from '../util/StyledVariant.tsx'


const BadgeNameInline: FC<{ badge: Badge, context?: VariantContext }> =
  ({ badge, context }) => {
    return (
      <Typography
        component="span"
        className="entity">
        {!context && badge.name.canonical.map((name, index) =>
          <span key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`}>
            {index > 0 && <span style={{ padding: '0.25em' }}>/</span>}
            <StyledVariant value={name}/>
          </span>
        )}
        {context && (
          <span>
            {badge.name.getVariant(context)?.value}
          </span>
        )}
      </Typography>
    )
  }

export default BadgeNameInline
