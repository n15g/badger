import { Stack, styled, Table, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { useSessionStorage } from '../util/use-session-storage.ts'
import Pagination from '../util/Pagination.tsx'
import { Badge, BadgeSearchOptions } from 'coh-content-db'
import ContentProvider from '../content/ContentProvider.tsx'
import BadgeSearchBar from './search/BadgeSearchBar.tsx'
import BadgeAcquisitionSummary from './BadgeAcquisitionSummary.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'
import { FC } from 'react'
import BadgeIcon from './BadgeIcon.tsx'

const TD = styled('td')(() => ({}))
const TH = styled('th')(() => ({}))
const hideOnSmall = { display: { xs: 'none', md: 'table-cell' } }

const BadgeList: FC = () => {
  const content = ContentProvider.useContent()
  const [searchOptions, setSearchOptions] = useSessionStorage<BadgeSearchOptions>('badge-list-parameters', BadgeSearchBar.defaultSearch)
  const badges = content.searchBadges(searchOptions)

  return (
    <>
      <BadgeSearchBar searchOptions={searchOptions} onChange={setSearchOptions}/>
      <Pagination paged={badges} onChange={(page, pageSize) => {
        setSearchOptions({ ...searchOptions, page: page, pageSize: pageSize })
      }}/>

      <Table noWrap={true} className="badgeList">
        <thead>
        <tr>
          <TH sx={{ width: 320 }}>Badge</TH>
          <TH sx={{ ...hideOnSmall, width: 140 }}>Type</TH>
          <TH sx={{ ...hideOnSmall, width: 140 }}>Release Date</TH>
          <TH sx={{ ...hideOnSmall }}>Requirement</TH>
        </tr>
        </thead>
        <tbody>
        {badges.items.map(badge => (
          <BadgeRow key={badge.key} badge={badge}/>
        ))}
        </tbody>
      </Table>
      <Pagination paged={badges} onChange={(page, pageSize) => {
        setSearchOptions({ ...searchOptions, page: page, pageSize: pageSize })
      }}/>
    </>
  )
}

const BadgeRow: FC<{ badge: Badge }> = ({ badge }) => {
  const { character } = CharacterContextProvider.useCharacterContext()
  const linkTarget = !character ? `/badges/${badge.key}` : `/characters/${character.key}/badges/${badge.key}`

  return (
    <tr>
      <TD>
        <NavLink to={linkTarget}>
          <Stack direction="row" alignItems="center" gap={1}>
            <BadgeIcon badge={badge} style={{ height: '1.5em' }}/>
            <Typography
              component="span"
              level="body-sm"
              title={badge.name.toString(' / ')}
            >
              <BadgeNameInline badge={badge} context={character}/>
            </Typography>
          </Stack>
        </NavLink>
      </TD>
      <TD sx={{ ...hideOnSmall }}>
        <NavLink to={linkTarget}>
          <Typography component="span" level="body-xs" sx={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}
                      title={BadgeTypes.get(badge.type)}>
            {BadgeTypes.get(badge.type)}
          </Typography>
        </NavLink>
      </TD>
      <TD sx={{ ...hideOnSmall }}>
        <NavLink to={linkTarget}>
          <Typography component="span" level="body-xs" sx={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}>
            <ReleaseDate value={badge.releaseDate}/>
          </Typography>
        </NavLink>
      </TD>
      <TD sx={{ ...hideOnSmall }}>
        <Typography component="span" level="body-xs">
          <BadgeAcquisitionSummary badge={badge}/>
        </Typography>
      </TD>
    </tr>
  )
}

export default BadgeList
