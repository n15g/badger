import { Box, Breadcrumbs, Button, Card, CardOverflow, Divider, ListItemDecorator, Tab, TabList, Tabs, Typography } from '@mui/joy'
import { FC, useState } from 'react'
import { Icons } from '../util/Icons.tsx'
import { NavLink, Outlet, useLocation, useParams } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import CharacterContextProvider from './CharacterContextProvider.tsx'
import { Character } from './character.ts'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'
import EditCharacterModal from './EditCharacterModal.tsx'
import ContentProvider from '../content/ContentProvider.tsx'

const CharacterViewPage: FC<{ character: Character }> = ({ character }) => {
  const content = ContentProvider.useContent()
  const { pathname } = useLocation()
  const params = useParams()

  const { name, server, archetypeKey } = character
  const badge = content.getBadge(params.badgeKey)

  const [editing, setEditing] = useState(false)

  return (
    <MainSection title={name}>
      <CharacterContextProvider character={character}>
        <Card sx={{ width: { md: 800, lg: 1200 } }}>
          <CardOverflow>
            <Breadcrumbs separator={<Icons.Breadcrumb/>}>
              <NavLink to="/characters" style={{ textDecoration: 'none' }}>
                <Typography level="title-sm" startDecorator={<Icons.Character/>}>Characters</Typography>
              </NavLink>
              <Typography level="title-sm">{name} ({server})</Typography>
            </Breadcrumbs>
            <Divider inset="context"/>
          </CardOverflow>

          <SectionTitle>
            {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey}/>} {name}
          </SectionTitle>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            position: { lg: 'absolute' },
            top: 48,
            right: 8,
            p: { md: 2 }
          }}>
            <Button color="primary" variant="soft" onClick={() => {
              setEditing(true)
            }}><Icons.Edit/></Button>
            <EditCharacterModal character={editing ? character : undefined} onClose={() => {
              setEditing(false)
            }}/>
          </Box>

          <Tabs value={pathname}>
            <TabList>
              <Tab
                component={NavLink} to={`/characters/${character.key}`}
                value={`/characters/${character.key}`}>
                Badge List
              </Tab>
              <Tab
                component={NavLink} to={`/characters/${character.key}/gallery`}
                value={`/characters/${character.key}/gallery`}>
                Gallery
              </Tab>
              {badge && (
                <Tab
                  component={NavLink}
                  to={`/characters/${character.key}/badges/${badge.key}`}
                  value={`/characters/${character.key}/badges/${badge.key}`}>
                  <ListItemDecorator>
                    <Icons.Badge/>
                  </ListItemDecorator>
                  {badge.name.toString(' / ')}
                </Tab>
              )}
            </TabList>
          </Tabs>

          <Outlet/>

        </Card>
      </CharacterContextProvider>
    </MainSection>
  )
}

export default CharacterViewPage
