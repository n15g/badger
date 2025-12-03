import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import ZoneTooltip from '../zone/ZoneTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const ZoneLink: FC<{ value: Zone | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value.key
  const zone = typeof value === 'string' ? content.getZone(key) : value

  if (zone) {
    return (
      <Tooltip placement="top" title={<ZoneTooltip zone={zone}/>}>
        <NavLink to={`/zones/${key}`} className="entityLink">
          <span className="entity">{zone.name}</span> <Icons.Zone/>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown zone">{key}</ErrorText> <Icons.Zone/>
      </span>
    )
  }
}

export default ZoneLink
