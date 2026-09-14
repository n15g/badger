import { FC, ReactElement } from 'react'
import { Mission } from 'coh-content-db'
import { Card, CardOverflow, Divider, Stack, Tooltip, TooltipProps, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import ContactLink from '../contact/ContactLink.tsx'
import { Icons } from '../util/Icons.tsx'
import { MissionTypeLabels } from './MissionTypeLabels.tsx'

const MissionTooltip: FC<{ mission: Mission, children: ReactElement } & Omit<TooltipProps, 'title'>>
  = ({ mission, children, ...props }) => {
  const { contactKeys } = mission

  const content = (
    <Card variant="plain" sx={{ minWidth: 280, maxWidth: 320, alignItems: 'center' }}>
      <CardOverflow sx={{ alignItems: 'center' }}>
        <Typography level="title-sm" startDecorator={<Icons.Mission/>} sx={{ p: 1 }}>
          {MissionTypeLabels.get(mission.type)}
        </Typography>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack direction="column" spacing={1} alignItems="center">
        <NavLink to={`/missions/${mission.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography level="title-lg" textAlign="center">{mission.name}</Typography>
        </NavLink>
      </Stack>

      {contactKeys && contactKeys.length > 0 && (<>
        <Divider/>
        {contactKeys.length <= 2 && (
          <Stack gap={1}>
            {contactKeys.map((contactKey) => (<ContactLink key={contactKey} value={contactKey}/>))}
          </Stack>
        )}
        {contactKeys.length > 2 && (
          <Typography sx={{ fontStyle: 'italic' }} textAlign="center">
            Multiple Contacts
          </Typography>
        )}
      </>)}

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={mission.morality}/>
          {mission.levelRange && <div style={{ marginLeft: 'auto' }}><LevelRangeLabel value={mission.levelRange}/></div>}
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

export default MissionTooltip
