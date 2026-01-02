import { Box, Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Contact } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import LocationLink from '../location/LocationLink.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import ContactMissions from './ContactMissions.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'

const ContactCard: FC<{ contact: Contact }> = ({ contact }) => {
  const { name, title, location, levelRange, morality, links, notes } = contact

  return (
    <MainSection title={name}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Contact/>}>Contacts</Typography>
            </NavLink>
            <Typography level="title-sm">{name}</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <Divider/>

        <Stack sx={{
          flexDirection: { xs: 'column', md: 'row-reverse' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2
        }}>

          <InfoPanel>
            <Icons.Contact size={64}/>

            <Typography textAlign="center" level="title-xl">{name}</Typography>

            {title && (<>
              <Typography level="title-sm" sx={{ fontStyle: 'italic' }}>{title}</Typography>
            </>)}

            <Stack direction="row" gap={4}>
              <MoralityListIcons moralityList={morality}/>
              {levelRange && <LevelRangeLabel value={levelRange}/>}
            </Stack>

            {location && (<>
              <LocationLink location={location}/>
            </>)}
          </InfoPanel>

          {/* Detail Panel*/}
          <Stack gap={2} flexGrow={1}>

            <Box>
              <Typography level="title-lg" startDecorator={<Icons.Mission/>}>Related Missions</Typography>
              <ContactMissions contact={contact}/>
            </Box>

            <NotesBlock notes={notes}/>

            <LinksBlock links={links}/>

          </Stack>

        </Stack>
      </Card>
    </MainSection>
  )
}

export default ContactCard
