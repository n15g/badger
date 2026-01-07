import { FC, useMemo } from 'react'
import { List, ListItem, ListItemDecorator, Typography } from '@mui/joy'
import CharacterDbProvider from '../character/CharacterDbProvider.tsx'
import { Character } from '../character/character.ts'
import { Badge } from 'coh-content-db'
import YesChip from '../util/YesChip.tsx'
import NoChip from '../util/NoChip.tsx'
import CharacterLink from '../util/CharacterLink.tsx'
import InfoPanel from '../util/InfoPanel.tsx'

const BadgeCharactersPanel: FC<{ badge: Badge, characters?: Character[] }> = ({ badge, characters }) => {
  const { characters: dbCharacters, hasBadge } = CharacterDbProvider.useCharacterDb()
  const source = characters ?? dbCharacters

  const list = useMemo(() => {
    return source.sort((a, b) => a.name.localeCompare(b.name))
  }, [source])

  return (
    <InfoPanel>
      <Typography level="title-lg">
        Characters
      </Typography>

      {list.length > 0 && (
        <List>
          {list.map((character) => (
            <ListItem key={character.key}>
              <ListItemDecorator>
                {hasBadge(character, badge) ? <YesChip/> : <NoChip/>}
              </ListItemDecorator>
              <CharacterLink value={character}/>
            </ListItem>
          ))}
        </List>
      )}

      {list.length === 0 && (
        <Typography level="body-sm"><em>No Characters</em></Typography>
      )}
    </InfoPanel>
  )
}

export default BadgeCharactersPanel
