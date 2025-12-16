import { FC } from 'react'
import { Zone } from 'coh-content-db'
import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import { ZoneTypes } from './ZoneTypes.tsx'

const ZoneTooltip: FC<{ zone: Zone }> = ({ zone }) => {
  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/zones" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Zone/>}>Zones</Typography>
          </NavLink>
          <Typography level="title-sm">{ZoneTypes.get(zone.type)}</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack spacing={1}>
        <Stack direction="column" spacing={1} alignItems="center">
          <NavLink to={`/zones/${zone.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography textAlign="center" level="title-lg">{zone.name}</Typography>
          </NavLink>
        </Stack>
      </Stack>

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={zone.morality}/>
          {zone.levelRange && <div style={{ marginLeft: 'auto' }}><LevelRangeLabel value={zone.levelRange}/></div>}
        </Stack>
      </CardOverflow>
    </Card>
  )
}

export default ZoneTooltip
