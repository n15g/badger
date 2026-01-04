import { FC } from 'react'
import { Typography } from '@mui/joy'
import { Location } from 'coh-content-db'
import CoordsLabel from './CoordsLabel.tsx'
import LocationIcon from './LocationIcon.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import ZoneTooltip from '../zone/ZoneTooltip.tsx'

const LocationLink: FC<{ location: Location }> = ({ location }) => {
  const content = ContentProvider.useContent()

  const { zoneKey, coords, icon, iconText } = location
  const zone = content.getZone(location.zoneKey)

  return (
    <Typography component="span" display="inline-block" className="entityLink"
                startDecorator={icon && <LocationIcon icon={icon} text={iconText}/>}
                endDecorator={<Icons.Zone/>}
    >
      {zone && (
        <ZoneTooltip zone={zone}>
          <NavLink to={`/zones/${zoneKey}`} style={{ textDecoration: 'none', color: 'inherit' }} className="entity">
            {zone.name}
          </NavLink>
        </ZoneTooltip>
      )}
      {coords && (
        <Typography component="span" level="body-xs" style={zone && { paddingLeft: '0.5em' }}>
          <CoordsLabel coords={coords}/>
        </Typography>
      )}
    </Typography>
  )
}

export default LocationLink
