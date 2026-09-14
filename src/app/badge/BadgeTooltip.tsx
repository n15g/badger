import { FC, ReactElement } from 'react'
import { Card, CardOverflow, Divider, Stack, Tooltip, TooltipProps, Typography } from '@mui/joy'
import { Badge } from 'coh-content-db'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import BadgeNameList from './BadgeNameList.tsx'
import { Icons } from '../util/Icons.tsx'
import { BadgeTypeLabels } from './BadgeTypeLabels.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import BadgeAcquisitionSummary from './BadgeAcquisitionSummary.tsx'
import BadgeIcon from './BadgeIcon.tsx'


export const BadgeTooltip: FC<{ badge: Badge, children: ReactElement } & Omit<TooltipProps, 'title'>>
  = ({ badge, children, ...props }) => {
  const { key: badgeKey, morality, type, icon, releaseDate } = badge

  const content = (
    <Card variant="plain" sx={{ minWidth: 280, maxWidth: 320, alignItems: 'center' }}>
      <CardOverflow sx={{ alignItems: 'center' }}>
        <Typography level="title-sm" startDecorator={<Icons.Badge/>} sx={{ p: 1 }}>
          {BadgeTypeLabels.get(type)} Badge
        </Typography>
        <Divider inset="context"/>
      </CardOverflow>

      <NavLink to={`/badges/${badgeKey}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography component="span" textAlign="center" level="title-lg"><BadgeNameList badge={badge}/></Typography>
      </NavLink>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2} sx={{ pt: 2 }}>
        {icon.canonical.map((icon) => (
          <NavLink key={icon.value} to={`/badges/${badgeKey}`}>
            <BadgeIcon badge={badge} context={{ morality: icon.alignment, sex: icon.sex }}/>
          </NavLink>
        ))}
      </Stack>

      <Typography component="span" level="body-sm" textAlign="center">
        <BadgeAcquisitionSummary badge={badge}/>
      </Typography>

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

  return (
    <Tooltip {...props} title={content} variant="outlined" enterDelay={500} enterNextDelay={500} sx={{ p: 0 }}>
      {children}
    </Tooltip>
  )
}

export default BadgeTooltip
