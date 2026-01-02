import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Stack, Typography } from '@mui/joy'
import StyledAlternate from '../util/StyledAlternate.tsx'


const BadgeNameList: FC<{ badge: Badge }> =
  ({ badge }) => {

    return (
      <Stack direction="column" alignItems="center">
        {badge.name.canonical.map((name) =>
          <Typography
            key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`}
            component="span"
            className="entity"
            textAlign="center"
          >
            <StyledAlternate value={name}/>
          </Typography>
        )}
      </Stack>
    )
  }

export default BadgeNameList
