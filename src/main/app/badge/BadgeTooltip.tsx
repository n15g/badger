import { FC } from 'react'
import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Badge } from 'coh-content-db'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import BadgeNameList from './BadgeNameList.tsx'
import { Icons } from '../util/Icons.tsx'
import { BadgeTypeLabels } from './BadgeTypeLabels.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import BadgeAcquisitionSummary from './BadgeAcquisitionSummary.tsx'
import BadgeIcon from './BadgeIcon.tsx'

interface Props {
  badge: Badge
}

export const BadgeTooltip: FC<Props> = ({ badge }) => {
  const { key: badgeKey, morality, type, icon, releaseDate } = badge
  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/badges" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Badge/>}>Badges</Typography>
          </NavLink>
          <Typography level="title-sm">{BadgeTypeLabels.get(type)} Badge</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack direction="column" spacing={1} alignItems="center">
        <NavLink to={`/badge/${badgeKey}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component="span" textAlign="center" level="title-lg"><BadgeNameList badge={badge}/></Typography>
        </NavLink>

        <Stack direction="row" flexWrap="wrap" gap={2} sx={{ pt: 2 }}>
          {icon.canonical.map((icon) => (
            <NavLink key={icon.value} to={`/badge/${badgeKey}`}>
              <BadgeIcon badge={badge} context={{ morality: icon.alignment, sex: icon.sex }}/>
            </NavLink>
          ))}
        </Stack>

        <Typography component="span" level="body-sm" textAlign="center"><BadgeAcquisitionSummary badge={badge}/></Typography>
      </Stack>

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={morality}/>
          <Typography level="body-xs" textColor="text.tertiary">
            <ReleaseDate value={releaseDate} format="short"/>
          </Typography>
        </Stack>
      </CardOverflow>
    </Card>
  )
}

export default BadgeTooltip
