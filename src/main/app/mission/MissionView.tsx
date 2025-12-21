import { Breadcrumbs, Card, CardOverflow, Divider, List, ListItem, Stack, Typography } from '@mui/joy'
import { Mission } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import ContactLink from '../contact/ContactLink.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'
import { OuroIcon } from '../util/OuroIcon.tsx'

const MissionView: FC<{ mission: Mission }> = ({ mission }) => {
  const { name, contactKeys, levelRange, morality, links, notes, flashback } = mission

  return (
    <MainSection label={name}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/missions" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Mission/>}>Missions</Typography>
            </NavLink>
            <Typography level="title-sm">Mission</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <SectionTitle>
          {name}
        </SectionTitle>

        <Divider/>

        <Stack sx={{
          flexDirection: { xs: 'column', md: 'row-reverse' },
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 2
        }}>

          {/* Info Panel*/}
          <InfoPanel>
            <Icons.Mission size={64}/>

            <Typography textAlign="center" level="title-lg">{name}</Typography>

            <Stack direction="row" gap={4}>
              <MoralityListIcons moralityList={morality}/>
              {levelRange && <LevelRangeLabel value={levelRange}/>}
            </Stack>

            <Card variant="soft" color="warning"
                  sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <Typography level="title-lg"><OuroIcon sx={{ height: '1em' }}/> Flashback</Typography>

              {!flashback && (<>
                <em>None</em>
              </>)}

              {flashback && (<>
                <Typography textAlign="center">
                  <code>[{flashback.id}] - {flashback.name}</code>
                </Typography>

                <Stack direction="row" gap={4}>
                  <MoralityListIcons moralityList={flashback.morality}/>
                  {flashback.levelRange && <LevelRangeLabel value={flashback.levelRange}/>}
                </Stack>
              </>)}
            </Card>

            <Typography level="title-md"><Icons.Contact/> Contacts</Typography>
            <List>
              {contactKeys?.map((contactKey) => (
                <ListItem key={contactKey}>
                  <ContactLink value={contactKey}/>
                </ListItem>
              ))}
            </List>
          </InfoPanel>

          {/* Detail Panel*/}
          <Stack gap={2} flexGrow={1}>

            <NotesBlock notes={notes}/>

            <LinksBlock links={links}/>

          </Stack>

        </Stack>
      </Card>
    </MainSection>
  )
}

export default MissionView
