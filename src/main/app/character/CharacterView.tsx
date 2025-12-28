import { Breadcrumbs, Card, CardOverflow, Divider, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import { FC } from 'react'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import CharacterScopeProvider from './CharacterScopeProvider.tsx'
import { Character } from './character.ts'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'

const CharacterView: FC<{ character: Character }> = ({ character }) => {
  const {
    name,
    server,
    archetypeKey
  } = character

  return (
    <MainSection title={name}>
      <CharacterScopeProvider character={character}>
        <Card>
          <CardOverflow>
            <Breadcrumbs separator={<Icons.Breadcrumb/>}>
              <NavLink to="/characters" style={{ textDecoration: 'none' }}>
                <Typography level="title-sm" startDecorator={<Icons.Character/>}>Characters</Typography>
              </NavLink>
              <Typography level="title-sm">Character</Typography>
            </Breadcrumbs>
            <Divider inset="context"/>
          </CardOverflow>

          <SectionTitle>
            {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey}/>} {name} {server}
          </SectionTitle>

          <Divider inset="none"/>

          <Tabs>
            <TabList>
              <Tab>Collect</Tab>
              <Tab>Badge List</Tab>
            </TabList>
            <TabPanel value={0}>
              First
            </TabPanel>
            <TabPanel value={1}>
              Second
            </TabPanel>
          </Tabs>

        </Card>
      </CharacterScopeProvider>
    </MainSection>
  )
}

export default CharacterView
