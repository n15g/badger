import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Card, Typography } from '@mui/joy'
import SmartLink from '../util/SmartLink.tsx'

const ZoneTooltip: FC<{ zone: Zone }> = ({ zone }) => {
  return <Card>
    <Typography title="title-lg">{zone.name}</Typography>
    {zone.links.map(link => <SmartLink key={link.href} title={link.title} href={link.href}/>)}
  </Card>
}

export default ZoneTooltip
