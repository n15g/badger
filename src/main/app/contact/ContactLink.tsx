import { FC } from 'react'
import { Contact } from 'coh-content-db'
import { Tooltip } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'
import ContactTooltip from '../contact/ContactTooltip.tsx'
import { NavLink } from 'react-router'
import { Icons } from '../util/Icons.tsx'

const ContactLink: FC<{ value: Contact | string }> = ({ value }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value.key
  const contact = typeof value === 'string' ? content.getContact(key) : value

  if (contact) {
    return (
      <Tooltip placement="top" title={<ContactTooltip contact={contact}/>}>
        <NavLink to={`/contacts/${key}`} className="entityLink">
          <span className="entity">{contact.name}</span> <Icons.Contact/>
        </NavLink>
      </Tooltip>
    )
  } else {
    return (
      <span className="entityLink">
      <ErrorText title="Unknown contact">{key}</ErrorText> <Icons.Contact/>
      </span>
    )
  }
}

export default ContactLink
