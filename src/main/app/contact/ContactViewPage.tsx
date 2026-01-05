import { FC } from 'react'
import { useParams } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import Page404 from '../Page404.tsx'
import ContactCard from './ContactCard.tsx'

const ContactViewPage: FC = () => {
  const content = ContentProvider.useContent()
  const params = useParams()

  const contact = content.getContact(params.contactKey)

  return !contact ? <Page404/> : (
    <MainSection title={contact.name}>
      <ContactCard contact={contact}/>
    </MainSection>
  )
}

export default ContactViewPage
