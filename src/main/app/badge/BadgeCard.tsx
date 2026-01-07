import { Alert, Box, Breadcrumbs, Card, CardOverflow, Divider, List, ListDivider, Stack, Typography } from '@mui/joy'
import BadgeIcon from './BadgeIcon.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import { Badge } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import { BadgeTypeLabels } from './BadgeTypeLabels.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import SetTitleLabel from './SetTitleLabel.tsx'
import RequirementListItem from './RequirementListItem.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'
import BadgeNameList from './BadgeNameList.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'
import AsyncSwitch from '../util/AsyncSwitch.tsx'
import BadgeCharactersPanel from './BadgeCharactersPanel.tsx'

const BadgeCard: FC<{ badge: Badge }> = ({ badge }) => {
  const { character, hasBadge, collectBadge } = CharacterContextProvider.useCharacterContext()

  const owned = !character || hasBadge(badge)
  const badgesLink = character ? `/characters/${character.key}/badges` : `/badges`

  const {
    type,
    icon,
    badgeText,
    morality,
    links,
    acquisition,
    requirements,
    notes,
    effect,
    releaseDate,
    setTitleId,
    ignoreInTotals
  } = badge

  return (
    <Card color={character && owned ? 'success' : undefined}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to={badgesLink} style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Badge/>}>Badges</Typography>
          </NavLink>
          <Typography level="title-sm">{badge.name.toString(' / ')}</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>

      <Stack sx={{
        flexDirection: { xs: 'column', md: 'row-reverse' },
        justifyContent: 'space-between',
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: 2
      }}>

        <Stack gap={2}>
          <InfoPanel>
            <Typography component="span" level="title-xl"><BadgeNameList badge={badge}/></Typography>

            <Stack direction="row" flexWrap="wrap" gap={2}>
              {icon.canonical.map((icon) => (
                <BadgeIcon key={icon.value} badge={badge} context={{ morality: icon.alignment, sex: icon.sex }} muted={!owned}/>
              ))}
            </Stack>

            <Typography level="title-sm"><em>{BadgeTypeLabels.get(type)}</em></Typography>

            {effect && (
              <Typography level="body-xs" textAlign="center" variant="soft" sx={{ borderRadius: 8, px: 1, py: 1.5 }}>
                {effect}
              </Typography>
            )}

            <MoralityListIcons moralityList={morality}/>

            {setTitleId && (
              <SetTitleLabel value={setTitleId}/>
            )}

            {ignoreInTotals && (
              <Alert color="danger" sx={{ textAlign: 'center' }}>
                Not counted toward badge totals
              </Alert>
            )}

            <Divider/>
            <ReleaseDate value={releaseDate} format="long"/>
          </InfoPanel>

          <BadgeCharactersPanel badge={badge}/>
        </Stack>

        <Stack gap={2} flexGrow={1}>
          <Box>
            {badgeText.canonical.map((variant) => (
              <blockquote key={variant.value} className={variant.alignment}>
                <Typography component="span" level="body-xs">
                  <BadgerMarkdown content={variant.value}/>
                </Typography>
              </blockquote>
            ))}
          </Box>

          <Box>
            <Typography level="title-lg" startDecorator={<Icons.Acquisition/>}>Requirements</Typography>

            {character && (
              <AsyncSwitch
                size="lg"
                color={owned ? 'success' : 'neutral'}
                endDecorator="Complete"
                sx={{ p: 2 }}
                checked={owned}
                onFrobnicate={async (owned) => {
                  await collectBadge(badge, owned)
                }}
              />
            )}

            {acquisition && (
              <Typography component="span" level="body-md"><BadgerMarkdown content={acquisition}/></Typography>
            )}

            {requirements.length > 0 && (
              <List size="sm">
                {requirements.length > 1 && <ListDivider inset="startContent"/>}
                {requirements.map((requirement) => (
                  <div key={requirement.key}>
                    <RequirementListItem badge={badge} requirement={requirement}/>
                    {requirements.length > 1 && <ListDivider inset="startContent"/>}
                  </div>
                ))}
              </List>
            )}
          </Box>

          <NotesBlock notes={notes}/>

          <LinksBlock links={links}/>
        </Stack>

      </Stack>
    </Card>
  )
}

export default BadgeCard
