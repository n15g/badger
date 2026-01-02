import {
  Alert,
  Box,
  Breadcrumbs,
  Card,
  CardOverflow,
  Checkbox,
  Divider,
  List,
  ListDivider,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography
} from '@mui/joy'
import BadgeIcon from './BadgeIcon.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import { Badge } from 'coh-content-db'
import { FC, Fragment } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import { BadgeTypes } from './BadgeTypes.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import SetTitleLabel from './SetTitleLabel.tsx'
import RequirementListItem from './RequirementListItem.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'
import BadgeNameList from './BadgeNameList.tsx'

const BadgeCard: FC<{ badge: Badge }> = ({ badge }) => {
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
    <Card>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/badges" style={{ textDecoration: 'none' }}>
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

        <InfoPanel>
          <Typography component="span" level="title-xl"><BadgeNameList badge={badge}/></Typography>

          <Stack direction="row" flexWrap="wrap" gap={2}>
            {icon.canonical.map((icon) => (
              <BadgeIcon key={icon.value} badge={badge} context={{ morality: icon.alignment, sex: icon.sex }}/>
            ))}
          </Stack>

          <Typography level="title-sm"><em>{BadgeTypes.get(type)}</em></Typography>

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

        {/* Detail Panel*/}
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

          <Card variant="soft">
            <Typography level="title-md" startDecorator={<Icons.Acquisition/>}>Requirements</Typography>
            <Box sx={{ pl: 1 }}>

              {acquisition && (
                <Typography component="span" level="body-md"><BadgerMarkdown content={acquisition}/></Typography>
              )}

              {requirements.length > 0 && (
                <List size="sm">
                  {requirements.length > 1 && <ListDivider inset="startContent"/>}
                  {requirements.map((requirement) => (
                    <Fragment key={requirement.key}>
                      <ListItem>
                        <ListItemDecorator><Checkbox/></ListItemDecorator>
                        <ListItemContent>
                          <RequirementListItem requirement={requirement}/>
                        </ListItemContent>
                      </ListItem>
                      {requirements.length > 1 && <ListDivider inset="startContent"/>}
                    </Fragment>
                  ))}
                </List>
              )}

            </Box>
          </Card>

          <NotesBlock notes={notes}/>

          <LinksBlock links={links}/>
        </Stack>

      </Stack>
    </Card>
  )
}

export default BadgeCard
