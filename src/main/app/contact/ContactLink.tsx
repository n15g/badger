import { FC } from 'react'
import { Contact } from 'coh-content-db'
import { Typography } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import ContactTooltip from '../contact/ContactTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const ContactLink: FC<{ value?: Contact | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const contact = typeof value === 'string' ? content.getContact(key) : value

  if (contact) {
    return (
      <ContactTooltip contact={contact}>
        <NavLink to={`/contacts/${key}`} className="entityLink">
          <Typography component="span" display="inline" className="entity" startDecorator={<Icons.Contact/>}>
            {contact.name}
          </Typography>
        </NavLink>
      </ContactTooltip>
    )
  } else {
    return (
      <Typography component="span" display="inline" className="entityLink" startDecorator={<Icons.Contact/>}>
        <ErrorText title="Unknown contact">{key ?? 'Unknown Contact'}</ErrorText>
      </Typography>
    )
  }
}

export default ContactLink
