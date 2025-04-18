import { FC } from 'react'
import { Location as DbLocation } from 'coh-content-db'
import ZoneLink from '../zone/ZoneLink.tsx'
import { Box, Typography } from '@mui/joy'

const Location: FC<{ location: DbLocation }> =
  ({ location }) => {
    return <Box>
    {location.zoneKey && <ZoneLink zone={location.zoneKey}/>}
      {location.coords && <Typography>({location.coords[0]}, {location.coords[1]}, {location.coords[2]})</Typography>}
    </Box>
  }

export default Location
