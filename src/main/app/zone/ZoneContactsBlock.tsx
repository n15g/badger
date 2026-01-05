import { List, ListItem, Typography } from '@mui/joy'
import { Contact, Zone } from 'coh-content-db'
import { FC, useMemo } from 'react'
import ContentProvider from '../content/ContentProvider.tsx'
import { Icons } from '../util/Icons.tsx'
import ContactLink from '../contact/ContactLink.tsx'

const ZoneContacts: FC<{ zone: Zone }> = ({ zone }) => {
  const content = ContentProvider.useContent()

  const contacts: Contact[] = useMemo(() => {
    return content.contacts
      .filter((contact) => contact.location?.zoneKey === zone.key)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [zone.key, content])

  return (
    <>
      <Typography level="title-lg" startDecorator={<Icons.Contact/>}>Contacts</Typography>
      <Typography component="span" level="body-md">
        {contacts.length < 1 && (<>
          <p><em>None</em></p>
        </>)}
        {contacts.length >= 1 && (<>
          <List component="ul" marker="disc" sx={{ display: 'block', columnCount: { lg: 2 }, columnGap: 4 }}>
            {contacts.map((contact) => (
              <ListItem key={contact.key}>
                <ContactLink value={contact}/>
              </ListItem>
            ))}
          </List>
        </>)}
      </Typography>
    </>
  )
}

export default ZoneContacts
