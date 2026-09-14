import { FC, ReactElement } from 'react'
import { Zone } from 'coh-content-db'
import { Card, CardOverflow, Divider, Stack, Tooltip, TooltipProps, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import { ZoneTypeLabels } from './ZoneTypeLabels.tsx'

const ZoneTooltip: FC<{ zone: Zone, children: ReactElement } & Omit<TooltipProps, 'title'>>
  = ({ zone, children, ...props }) => {

  const content = (
    <Card variant="plain" sx={{ minWidth: 280, maxWidth: 320, alignItems: 'center' }}>
      <CardOverflow sx={{ alignItems: 'center' }}>
        <Typography level="title-sm" startDecorator={<Icons.Zone/>} sx={{ p: 1 }}>
          {ZoneTypeLabels.get(zone.type)}
        </Typography>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack direction="column" spacing={1} alignItems="center">
        <NavLink to={`/zones/${zone.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center" level="title-lg">{zone.name}</Typography>
        </NavLink>
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

  return (
    <Tooltip {...props} title={content} variant="outlined" enterDelay={500} enterNextDelay={500} sx={{ p: 0 }}>
      {children}
    </Tooltip>
  )
}

export default ZoneTooltip
