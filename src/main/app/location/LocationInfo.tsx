import { FC } from 'react'
import ZoneLink from '../zone/ZoneLink.tsx'
import { Sheet, Stack } from '@mui/joy'
import { Location } from 'coh-content-db'
import Coords from './Coords.tsx'
import LocationIcon from './LocationIcon.tsx'

const LocationInfo: FC<{ location?: Location }> = ({ location }) => {
  return (
    <Sheet variant="soft" sx={{ px: 1, py: 0.25, borderRadius: 8 }}>
      <Stack direction="row" gap={2} alignItems="center">
        <Stack direction="column">
          {location?.zoneKey && <ZoneLink zone={location.zoneKey}/>}
          {location?.coords && <Coords coords={location.coords}/>}
        </Stack>
        {(location?.icon ?? location?.iconText) && <LocationIcon icon={location.icon} text={location.iconText}/>}
      </Stack>
    </Sheet>
  )
}

export default LocationInfo
