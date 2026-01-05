import { Card, List, ListItem } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ZoneLink from './ZoneLink.tsx'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'

function ZoneListPage() {
  const content = ContentProvider.useContent()
  const zones = content.zones.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainSection title="Zones">
      <SectionTitle><Icons.Zone/> Zones</SectionTitle>

      <Card sx={{ display: { xs: 'contents', md: 'flex' } }}>
        <List sx={{ display: 'block', columnCount: { md: 2, lg: 3 }, columnGap: 4 }}>
          {zones.map((mission) => (
            <ListItem key={mission.key} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <ZoneLink value={mission}/>
            </ListItem>
          ))}
        </List>
      </Card>

    </MainSection>
  )
}

export default ZoneListPage
