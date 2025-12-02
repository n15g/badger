import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Stack } from '@mui/joy'
import StyledAlternate from '../util/StyledAlternate.tsx'


const BadgeNameList: FC<{ badge: Badge }> =
  ({ badge }) => {

    return (
      <Stack direction="column" alignItems="center">
        {badge.name.canonical.map((name) =>
          <div key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`} className="entity">
            <StyledAlternate value={name}/>
          </div>
        )}
      </Stack>
    )
  }

export default BadgeNameList
