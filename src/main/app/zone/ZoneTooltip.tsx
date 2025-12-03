import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import SmartLink from '../util/SmartLink.tsx'

const ZoneTooltip: FC<{ zone: Zone }> = ({ zone }) => {
  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Typography level="title-sm" sx={{ py: '0.25em' }}><Icons.Zone/> Zone</Typography>
        <Divider/>
      </CardOverflow>
      <Stack spacing={1}>
        <Stack direction="column" spacing={1} alignItems="center">
          <NavLink to={`/zone/${zone.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography title="title-lg">{zone.name}</Typography>
          </NavLink>

          <Divider sx={{ my: 1 }}/>

          {zone.links.map(link => (
            <SmartLink key={link.href} href={link.href}>{link.title}</SmartLink>
          ))}

        </Stack>
      </Stack>
    </Card>
  )
}

export default ZoneTooltip
