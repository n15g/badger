import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import SmartLink from '../util/SmartLink.tsx'
import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { NavLink } from 'react-router'
import { ZoneTypes } from './ZoneTypes.tsx'

const ZoneView: FC<{ zone: Zone }> = ({ zone }) => {
  return (
    <Card sx={{ width: 400, margin: 'auto' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/zones" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Zone/>}>Zones</Typography>
          </NavLink>
          <Typography level="title-sm">{ZoneTypes.get(zone.type)}</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack gap={2} alignItems="center">
        <Typography level="title-md">{zone.name}</Typography>
        {zone.links.map(link => (
          <SmartLink key={link.href} href={link.href}>{link.title}</SmartLink>
        ))}
      </Stack>
    </Card>
  )
}

export default ZoneView
