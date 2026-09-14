import { List, ListItem } from '@mui/joy'
import { Contact, Mission } from 'coh-content-db'
import { FC, useMemo } from 'react'
import ContentProvider from '../content/ContentProvider.tsx'
import MissionLink from '../mission/MissionLink.tsx'

const ContactMissions: FC<{ contact: Contact }> = ({ contact }) => {
  const content = ContentProvider.useContent()

  const missions: Mission[] = useMemo(() => {
    return content.missions.filter((mission) => mission.contactKeys?.includes(contact.key))
  }, [contact.key, content])

  return (
    <List component="ul" marker="disc">
      {missions.map((mission) => (
        <ListItem key={mission.key}>
          <MissionLink value={mission}/>
        </ListItem>
      ))}
    </List>

  )
}

export default ContactMissions
