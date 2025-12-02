import { FC } from 'react'
import { Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Badge } from 'coh-content-db'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import moment from 'moment'
import { SmartImage } from '../util/SmartImage.tsx'
import { NavLink } from 'react-router'
import BadgeNameList from './BadgeNameList.tsx'
import BadgeType from './BadgeType.tsx'
import { Icons } from '../util/Icons.tsx'

interface Props {
  badge: Badge
}

export const BadgeCardTooltip: FC<Props> = ({ badge }) => {
  const { acquisition, morality, releaseDate } = badge

  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow >
        <Typography level="title-sm" sx={{py: '0.25em'}}><Icons.Badge/> <BadgeType badge={badge}/> Badge</Typography>
        <Divider/>
      </CardOverflow>
      <Stack spacing={1}>
        <Stack direction="column" spacing={1} alignItems="center">
          <NavLink to={`/badge/${badge.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <BadgeNameList badge={badge}/>
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
            {badge.icon.canonical.map((icon) => (
              <NavLink key={icon.value} to={`/badge/${badge.key}`}>
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
        </Stack>

        {acquisition && (
          <Typography level="body-sm">
            {acquisition}
          </Typography>
        )}


        <Divider sx={{ my: 1 }}/>

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <MoralityListIcons moralityList={morality}/>

          <Typography level="body-xs" textColor="text.tertiary">
            <em title="Release date">{moment(releaseDate).format('MMM Y')}</em>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}

export default BadgeCardTooltip
