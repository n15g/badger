import {
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
import MainSection from '../util/MainSection.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import SetTitleLabel from './SetTitleLabel.tsx'
import RequirementListItem from './RequirementListItem.tsx'
import BadgeNameList from './BadgeNameList.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'

const BadgeView: FC<{ badge: Badge }> = ({ badge }) => {
  const { name, type, badgeText, morality, links, acquisition, requirements, notes, effect, releaseDate, setTitleId } = badge

  return (
    <MainSection label={name.toString(' / ')}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/badges" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Badge/>}>Badges</Typography>
            </NavLink>
            <Typography level="title-sm">{BadgeTypes.get(type)} Badge</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <SectionTitle>
          <BadgeNameList badge={badge}/>
        </SectionTitle>

        <Divider inset="none"/>

        <Stack sx={{
          flexDirection: { xs: 'column', md: 'row-reverse' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2
        }}>

          {/* Info Panel*/}
          <InfoPanel>

            <Typography startDecorator={<Icons.Badge/>}>{BadgeTypes.get(type)}</Typography>
            <BadgeIcon badge={badge}/>

            {effect && (
              <Typography level="body-xs" textAlign="center" variant="soft" sx={{ borderRadius: 8, px: 1, py: 1.5 }}>
                {effect}
              </Typography>
            )}

            <MoralityListIcons moralityList={morality}/>

            {setTitleId && (
              <SetTitleLabel value={setTitleId}/>
            )}

            <Divider/>
            <ReleaseDate value={releaseDate} format="long"/>

          </InfoPanel>

          {/* Detail Panel*/}
          <Stack gap={2} flexGrow={1}>
            <Box>
              {badgeText.canonical.map((alternate) => (
                <blockquote key={alternate.value} className={alternate.alignment}>
                  <Typography component="span" level="body-xs">
                    <BadgerMarkdown content={alternate.value}/>
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
    </MainSection>
  )
}

export default BadgeView
