import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'
import BadgeList from './BadgeList.tsx'
import { Card } from '@mui/joy'


function BadgeListPage() {
  return (
    <MainSection title="Badges">
      <SectionTitle><Icons.Badge/> Badges</SectionTitle>

      <Card>
        <BadgeList/>
      </Card>

    </MainSection>
  )
}

export default BadgeListPage
