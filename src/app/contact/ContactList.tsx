import { Card, List, ListItem } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ContactLink from './ContactLink.tsx'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'

function ContactList() {
  const content = ContentProvider.useContent()
  const contacts = content.contacts.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainSection title="Contacts">
      <SectionTitle><Icons.Contact/> Contacts</SectionTitle>

      <Card sx={{ display: { xs: 'contents', md: 'flex' } }}>
        <List sx={{ display: 'block', columnCount: { md: 2, lg: 3 }, columnGap: 4 }}>
          {contacts.map((mission) => (
            <ListItem key={mission.key} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <ContactLink value={mission}/>
            </ListItem>
          ))}
        </List>
      </Card>

    </MainSection>
  )
}

export default ContactList
