import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'
import BadgeGallery from './BadgeGallery.tsx'

function BadgeGalleryPage() {

  return (
    <MainSection title="Badges">
      <SectionTitle><Icons.Badge/> Badge Gallery</SectionTitle>

      <BadgeGallery/>

    </MainSection>
  )
}

export default BadgeGalleryPage
