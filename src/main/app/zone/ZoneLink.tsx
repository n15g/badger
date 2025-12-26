import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Tooltip, Typography } from '@mui/joy'
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
      <Tooltip title={<ZoneTooltip zone={zone}/>} variant="plain">
        <NavLink to={`/zones/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity" startDecorator={<Icons.Zone/>}>
            {zone.name}
          </Typography>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown zone">{key ?? 'Unknown Zone'}</ErrorText> <Icons.Zone/>
      </span>
    )
  }
}

export default ZoneLink
