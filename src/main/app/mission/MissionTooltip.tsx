import { FC } from 'react'
import { Mission } from 'coh-content-db'
import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import { MissionTypes } from './MissionTypes.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import ContactLink from '../contact/ContactLink.tsx'

const MissionTooltip: FC<{ mission: Mission }> = ({ mission }) => {
  const { contactKeys } = mission

  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/missions" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Mission/>}>Missions</Typography>
          </NavLink>
          <Typography level="title-sm">{MissionTypes.get(mission.type) ?? 'Mission'}</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack spacing={1} alignItems="center">
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
            <Typography sx={{ fontStyle: 'italic' }} startDecorator={<Icons.Contact/>}>
              Multiple Contacts
            </Typography>
          )}
        </>)}
      </Stack>

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={mission.morality}/>
          {mission.levelRange && <div style={{ marginLeft: 'auto' }}><LevelRangeLabel value={mission.levelRange}/></div>}
        </Stack>
      </CardOverflow>
    </Card>
  )
}

export default MissionTooltip
