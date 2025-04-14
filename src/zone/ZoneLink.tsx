import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Tooltip, Typography } from '@mui/joy'
import ContentService from '../ContentService.ts'
import ZoneTooltip from './ZoneTooltip.tsx'

const ZoneLink: FC<{ zone: Zone | string }> = ({ zone }) => {
  const zoneKey = typeof zone === 'string' ? zone : zone.key
  const zoneEntity = typeof zone === 'string' ? ContentService.db.getZone(zoneKey) : zone

  if (zoneEntity) {
    return <Tooltip title={<ZoneTooltip zone={zoneEntity}/>}>
      <Typography>
        {zoneEntity.name}
      </Typography>
    </Tooltip>
  } else {
    return <Typography color="danger" title={'Unknown Zone'}>{zoneKey}</Typography>
  }
}

export default ZoneLink
