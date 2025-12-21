import { FC } from 'react'
import { Tooltip, Typography } from '@mui/joy'
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
    <Typography component="span" display="inline" className="entityLink"
                startDecorator={icon && <LocationIcon icon={icon} text={iconText}/>}
                endDecorator={<Icons.Zone/>}
    >
      {zone && (
        <Tooltip title={<ZoneTooltip zone={zone}/>} variant="plain">
          <NavLink to={`/zones/${zoneKey}`} style={{ textDecoration: 'none', color: 'inherit' }} className="entity">
            {zone.name}
          </NavLink>
        </Tooltip>
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
