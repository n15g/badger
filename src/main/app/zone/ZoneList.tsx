import { Card, List, ListItem } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ZoneLink from './ZoneLink.tsx'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'

function ZoneList() {
  const content = ContentProvider.useContent()
  const zones = content.zones.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainSection label="Zones">
      <SectionTitle><Icons.Zone/> Zones</SectionTitle>

      <Card>
        <List component="ul" marker="disc" sx={{ display: 'block', columnCount: { md: 2, lg: 3 }, columnGap: 4 }}>
          {zones.map((zone) => (<ListItem key={zone.key}>
            <ZoneLink value={zone}/>
          </ListItem>))}
        </List>
      </Card>

    </MainSection>
  )
}

export default ZoneList
