import { FC } from 'react'
import ZoneLink from '../zone/ZoneLink.tsx'
import { Sheet, Stack } from '@mui/joy'
import { Location } from 'coh-content-db'
import CoordsLabel from './CoordsLabel.tsx'
import LocationIcon from './LocationIcon.tsx'

const LocationInfo: FC<{ location: Location | undefined }> = ({ location }) => {
  return (
    <Sheet variant="soft" sx={{ px: 1, py: 0.25, borderRadius: 8 }}>
      <Stack direction="row" gap={2} alignItems="center">
        <Stack direction="column" alignItems="center">
          {location?.zoneKey && <ZoneLink value={location.zoneKey}/>}
          {location?.coords && <CoordsLabel coords={location.coords}/>}
        </Stack>
        {(location?.icon ?? location?.iconText) && <LocationIcon icon={location.icon} text={location.iconText}/>}
      </Stack>
    </Sheet>
  )
}

export default LocationInfo
