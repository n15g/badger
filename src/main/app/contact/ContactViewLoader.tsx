import ContentProvider from '../content/ContentProvider.tsx'
import { useParams } from 'react-router'
import ContactView from './ContactView.tsx'
import Page404 from '../Page404.tsx'

function ContactViewLoader() {
  const content = ContentProvider.useContent()
  const params = useParams()

  const contact = content.getContact(params.contactKey)

  return contact ? <ContactView contact={contact}/> : <Page404/>
}

export default ContactViewLoader
