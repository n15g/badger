import { Card, List, ListItem } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import MissionLink from './MissionLink.tsx'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'

function MissionList() {
  const content = ContentProvider.useContent()
  const missions = content.missions.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainSection label="Missions">
      <SectionTitle><Icons.Mission/> Missions</SectionTitle>

      <Card>
        <List component="ul" marker="disc" sx={{ display: 'block', columnCount: { md: 2, lg: 3 }, columnGap: 4 }}>
          {missions.map((mission) => (<ListItem key={mission.key}>
            <MissionLink value={mission}/>
          </ListItem>))}
        </List>
      </Card>

    </MainSection>
  )
}

export default MissionList
