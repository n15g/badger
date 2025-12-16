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
    <MainSection label="Contacts">
      <SectionTitle><Icons.Contact/> Contacts</SectionTitle>

      <Card>
        <List component="ul" marker="disc" sx={{ display: 'block', columnCount: { md: 2, lg: 3 }, columnGap: 4 }}>
          {contacts.map((contact) => (<ListItem key={contact.key}>
            <ContactLink value={contact}/>
          </ListItem>))}
        </List>
      </Card>

    </MainSection>
  )
}

export default ContactList
