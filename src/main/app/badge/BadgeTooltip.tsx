import { FC } from 'react'
import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Badge } from 'coh-content-db'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import { SmartImage } from '../util/SmartImage.tsx'
import { NavLink } from 'react-router'
import BadgeNameList from './BadgeNameList.tsx'
import { Icons } from '../util/Icons.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'

interface Props {
  badge: Badge
}

export const BadgeCardTooltip: FC<Props> = ({ badge }) => {
  const { key: badgeKey, acquisition, morality, type, icon, releaseDate } = badge
  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/badges" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Badge/>}>Badges</Typography>
          </NavLink>
          <Typography level="title-sm">{BadgeTypes.get(type)} Badge</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack direction="column" spacing={1} alignItems="center">
        <NavLink to={`/badge/${badgeKey}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography textAlign="center" level="title-lg"><BadgeNameList badge={badge}/></Typography>
        </NavLink>

        <Stack
          direction="row"
          gap={1}
          sx={{
            width: 200,
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon.canonical.map((icon) => (
            <NavLink key={icon.value} to={`/badge/${badgeKey}`}>
              <SmartImage
                src={icon.value}
                sx={(theme) => {
                  return {
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    flexShrink: 1,
                    filter: `drop-shadow(0 0 4px ${theme.palette.text.primary})`,
                  }
                }}/>
            </NavLink>
          ))}
        </Stack>

        {acquisition && (
          <Typography level="body-sm">
            {acquisition}
          </Typography>
        )}
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

export default BadgeCardTooltip
