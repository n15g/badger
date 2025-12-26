import { Card, styled, Table, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { useSessionStorage } from '../util/use-session-storage.ts'
import Pagination from '../util/Pagination.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import { BadgeSearchOptions } from 'coh-content-db'
import ContentProvider from '../content/ContentProvider.tsx'
import BadgeSearchBar from './search/BadgeSearchBar.tsx'
import BadgeAcquisitionSummary from './BadgeAcquisitionSummary.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import MainSection from '../util/MainSection.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'
import ReleaseDate from '../util/ReleaseDate.tsx'

const TD = styled('td')(() => ({}))
const TH = styled('th')(() => ({}))
const hideOnSmall = { display: { xs: 'none', md: 'table-cell' } }


function BadgeList() {
  const content = ContentProvider.useContent()
  const [searchOptions, setSearchOptions] = useSessionStorage<BadgeSearchOptions>('badge-list-parameters', BadgeSearchBar.defaultSearch)
  const badges = content.searchBadges(searchOptions)

  return (
    <MainSection title="Badges">
      <SectionTitle><Icons.Badge/> Badges</SectionTitle>

      <Card>
        <BadgeSearchBar searchOptions={searchOptions} onChange={setSearchOptions}></BadgeSearchBar>
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
            <tr key={badge.key}>
              <TD>
                <NavLink to={badge.key}>
                  <Typography component="span" level="body-sm"
                              startDecorator={<BadgeIcon badge={badge} height="1em"/>}
                              title={badge.name.toString(' / ')}
                  >
                    <BadgeNameInline badge={badge}/>
                  </Typography>
                </NavLink>
              </TD>
              <TD sx={{ ...hideOnSmall }}>
                <NavLink to={badge.key}>
                  <Typography component="span" level="body-xs" sx={{ overflowX: 'hidden', textOverflow: 'ellipsis' }}
                              title={BadgeTypes.get(badge.type)}>
                    {BadgeTypes.get(badge.type)}
                  </Typography>
                </NavLink>
              </TD>
              <TD sx={{ ...hideOnSmall }}>
                <NavLink to={badge.key}>
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
          ))
          }
          </tbody>
        </Table>
        <Pagination paged={badges} onChange={(page, pageSize) => {
          setSearchOptions({ ...searchOptions, page: page, pageSize: pageSize })
        }}/>
      </Card>

    </MainSection>
  )
}

export default BadgeList
