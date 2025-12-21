import { Box, Breadcrumbs, Card, CardOverflow, Divider, List, ListItem, Stack, Typography } from '@mui/joy'
import { Contact } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import SmartLink from '../util/SmartLink.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import LocationLink from '../location/LocationLink.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import ContactMissions from './ContactMissions.tsx'

const ContactView: FC<{ contact: Contact }> = ({ contact }) => {
  const { name, title, location, levelRange, morality, links, notes } = contact

  return (
    <MainSection label={name}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Contact/>}>Contacts</Typography>
            </NavLink>
            <Typography level="title-sm">Contact</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <Box>
          <SectionTitle>
            {name}
          </SectionTitle>
        </Box>

        <Stack sx={{
          flexDirection: { xs: 'column', sm: 'row-reverse' },
          justifyContent: 'space-between',
          gap: 2
        }}>

          {/* Info Panel*/}
          <Card sx={{ minWidth: 240 }}>
            <Stack gap={2} alignItems="center">
              <Icons.Contact size={64}/>

              <Typography textAlign="center" level="title-lg">{name}</Typography>

              {title && (<>
                <Typography level="title-sm" sx={{ fontStyle: 'italic' }}>{title}</Typography>
              </>)}

              <Divider/>

              {levelRange && <LevelRangeLabel value={levelRange}/>}

              {location && (<>
                <LocationLink location={location}/>
              </>)}

              <MoralityListIcons moralityList={morality}/>

              {links.length > 0 && (<>
                <Divider/>
                <List>
                  {links.map(link => (
                    <ListItem key={link.href}>
                      <Typography startDecorator={<Icons.Link/>}><SmartLink href={link.href}>{link.title}</SmartLink></Typography>
                    </ListItem>
                  ))}
                </List>
              </>)}
            </Stack>
          </Card>

          {/* Detail Panel*/}
          <Stack gap={2} flexGrow={1}>

            <Box>
              <Typography level="title-lg" startDecorator={<Icons.Mission/>}>Related Missions</Typography>
              <ContactMissions contact={contact}/>
            </Box>

            <Card>
              <Typography level="title-md" startDecorator={<Icons.Notes/>}>Notes</Typography>
              <Box sx={{ pl: 1 }}>
                <Typography component="span" level={'body-sm'}>{notes ? <BadgerMarkdown content={notes}/> :
                  <em>No notes</em>}</Typography>
              </Box>
            </Card>

          </Stack>

        </Stack>
      </Card>
    </MainSection>
  )
}

export default ContactView
