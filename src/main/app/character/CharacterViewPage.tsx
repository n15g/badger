import { Box, Breadcrumbs, Button, Card, CardOverflow, Divider, ListItemDecorator, Stack, Tab, TabList, Tabs, Typography } from '@mui/joy'
import { FC, useState } from 'react'
import { Icons } from '../util/Icons.tsx'
import { NavLink, Outlet, useLocation, useParams } from 'react-router'
import MainSection from '../util/MainSection.tsx'
import CharacterContextProvider from './CharacterContextProvider.tsx'
import { Character } from './character.ts'
import ArchetypeIcon from '../archetype/ArchetypeIcon.tsx'
import EditCharacterModal from './EditCharacterModal.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import MoralityIcon from '../morality/MoralityIcon.tsx'
import MoralitySelect from '../morality/MoralitySelect.tsx'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import BadgeCount from './BadgeCount.tsx'

const CharacterViewPage: FC<{ character: Character }> = ({ character }) => {
  const content = ContentProvider.useContent()
  const { mutateCharacter } = CharacterDbProvider.useCharacterDb()
  const { pathname } = useLocation()
  const params = useParams()

  const { name, morality, archetypeKey, server } = character
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

          <Card>
            <Stack gap={1} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} justifyContent="space-between" alignItems="center">
              <Stack gap={1} direction="row">
                {morality && <MoralityIcon morality={morality} height={32}/>}
                {archetypeKey && <ArchetypeIcon archetypeKey={archetypeKey} height={32}/>}
              </Stack>

              <Typography level="title-xl" startDecorator={<Icons.Character/>}>{name} ({server})</Typography>

              <BadgeCount character={character}/>

              <MoralitySelect value={morality} onNewValue={(next) => {
                void mutateCharacter(character.key, (draft) => {
                  draft.morality = next
                })
              }}/>

              <Button color="primary" variant="soft" onClick={() => {
                setEditing(true)
              }}><Icons.Edit/></Button>
              <EditCharacterModal character={editing ? character : undefined} onClose={() => {
                setEditing(false)
              }}/>
            </Stack>
          </Card>

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

          <Box sx={{ pt: 2 }}>
            <Outlet/>
          </Box>

        </Card>
      </CharacterContextProvider>
    </MainSection>
  )
}

export default CharacterViewPage
