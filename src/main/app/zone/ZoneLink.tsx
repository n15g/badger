import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Link, Tooltip, Typography } from '@mui/joy'
import ZoneTooltip from './ZoneTooltip.tsx'
import ContentProvider from '../content/ContentProvider.tsx'

const ZoneLink: FC<{ zone: Zone | string }> = ({ zone }) => {
  const content = ContentProvider.useContent()
  const zoneKey = typeof zone === 'string' ? zone : zone.key
  const zoneEntity = typeof zone === 'string' ? content.getZone(zoneKey) : zone

  if (zoneEntity) {
    return <Tooltip placement="top" title={<ZoneTooltip zone={zoneEntity}/>}>
      <Link>
        {zoneEntity.name}
      </Link>
    </Tooltip>
  } else {
    return <Typography color="danger" title={'Unknown Zone'}>{zoneKey}</Typography>
  }
}

export default ZoneLink
