import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Zone } from 'coh-content-db'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'
import InfoPanel from '../util/InfoPanel.tsx'
import NotesBlock from '../util/NotesBlock.tsx'
import LinksBlock from '../util/LinksBlock.tsx'
import { ZoneTypes } from './ZoneTypes.tsx'
import ZoneContactsBlock from './ZoneContactsBlock.tsx'

const ZoneCard: FC<{ zone: Zone }> = ({ zone }) => {
  const { name, type, levelRange, morality, links, notes, } = zone

  return (
    <MainSection title={name}>
      <Card>
        <CardOverflow>
          <Breadcrumbs separator={<Icons.Breadcrumb/>}>
            <NavLink to="/zones" style={{ textDecoration: 'none' }}>
              <Typography level="title-sm" startDecorator={<Icons.Zone/>}>Zones</Typography>
            </NavLink>
            <Typography level="title-sm">{zone.name}</Typography>
          </Breadcrumbs>
          <Divider inset="context"/>
        </CardOverflow>

        <SectionTitle>
          {name}
        </SectionTitle>

        <Divider/>

        <Stack sx={{
          flexDirection: { xs: 'column', md: 'row-reverse' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 2
        }}>

          <InfoPanel>
            <Icons.Zone size={64}/>

            <Typography textAlign="center" level="title-xl">{name}</Typography>
            <Typography level="title-sm" sx={{ fontStyle: 'italic' }}>{ZoneTypes.get(type)}</Typography>

            <Stack direction="row" gap={4}>
              <MoralityListIcons moralityList={morality}/>
              {levelRange && <LevelRangeLabel value={levelRange}/>}
            </Stack>

          </InfoPanel>

          {/* Detail Panel*/}
          <Stack gap={2} flexGrow={1}>

            <ZoneContactsBlock zone={zone}/>

            <NotesBlock notes={notes}/>

            <LinksBlock links={links}/>

          </Stack>

        </Stack>
      </Card>
    </MainSection>
  )
}

export default ZoneCard
