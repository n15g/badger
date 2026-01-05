import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Typography } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import ZoneTooltip from '../zone/ZoneTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const ZoneLink: FC<{ value?: Zone | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const zone = typeof value === 'string' ? content.getZone(key) : value

  if (zone) {
    return (
      <ZoneTooltip zone={zone}>
        <NavLink to={`/zones/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity" startDecorator={<Icons.Zone/>}>
            {zone.name}
          </Typography>
        </NavLink>
      </ZoneTooltip>
    )
  } else {
    return (
      <Typography component="span" display="inline" className="entityLink" startDecorator={<Icons.Zone/>}>
        <ErrorText title="Unknown zone">{key ?? 'Unknown Zone'}</ErrorText> <Icons.Zone/>
      </Typography>
    )
  }
}

export default ZoneLink
