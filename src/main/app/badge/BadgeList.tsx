import { Box, Card, Stack, styled, Table, Typography } from '@mui/joy'
import { NavLink } from 'react-router'
import { useSessionStorage } from '../util/use-session-storage.ts'
import Pagination from '../util/Pagination.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import { BadgeSearchOptions } from 'coh-content-db'
import { FC, ReactNode } from 'react'
import MoralityListIcons from '../alignment/MoralityListIcons.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import BadgeSearchBar from './search/BadgeSearchBar.tsx'
import BadgeAcquisitionPreview from './BadgeAcquisitionPreview.tsx'
import BadgeNameInline from './BadgeNameInline.tsx'
import MainSection from '../util/MainSection.tsx'
import { BadgeTypes } from './BadgeTypes.tsx'
import SectionTitle from '../util/SectionTitle.tsx'
import { Icons } from '../util/Icons.tsx'

const TD = styled('td')(() => ({}))
const TH = styled('th')(() => ({}))
const hideOnSmall = { display: { xs: 'none', md: 'table-cell' } }


function BadgeList() {
  const content = ContentProvider.useContent()
  const [searchOptions, setSearchOptions] = useSessionStorage<BadgeSearchOptions>('badge-list-parameters', BadgeSearchBar.defaultSearch)
  const badges = content.searchBadges(searchOptions)

  return (
    <MainSection label="Badges">
      <SectionTitle><Icons.Badge/> Badges</SectionTitle>

      <Card>
        <BadgeSearchBar searchOptions={searchOptions} onChange={setSearchOptions}></BadgeSearchBar>
        <Pagination paged={badges} onChange={(page, pageSize) => {
          setSearchOptions({ ...searchOptions, page: page, pageSize: pageSize })
        }}/>

        <Table noWrap={true}>
          <thead>
          <tr>
            <TH sx={{ width: { xs: 120, md: 200 } }} style={{ textAlign: 'center' }}>Icon</TH>
            <TH sx={{ width: { xs: 120, md: 240 } }} style={{ textAlign: 'center' }}>Name</TH>
            <TH sx={{ ...hideOnSmall, width: 200 }} style={{ textAlign: 'center' }}>Type</TH>
            <TH sx={{ ...hideOnSmall }}>Acquisition</TH>
          </tr>
          </thead>
          <tbody>
          {badges.items.map(badge => (
            <tr key={badge.key}>
              <TD style={{ height: 100 }} sx={{ overflowX: 'hidden' }}>
                <RowLink to={badge.key}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BadgeIcon badge={badge}/>
                  </Box>
                </RowLink>
              </TD>
              <TD>
                <RowLink to={badge.key}>
                  <BadgeNameInline badge={badge}/>
                </RowLink>
              </TD>
              <TD sx={{ ...hideOnSmall }}>
                <RowLink to={badge.key}>
                  <Stack direction="column" spacing={2} alignItems="center">
                    <Typography>{BadgeTypes.get(badge.type)}</Typography>
                    <MoralityListIcons moralityList={badge.morality}/>
                  </Stack>
                </RowLink>
              </TD>
              <TD sx={{ ...hideOnSmall }}>
                <BadgeAcquisitionPreview badge={badge}/>
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

const RowLink: FC<{ children: ReactNode, to: string }> = ({ children, to }) => {
  return <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    {children}
  </NavLink>
}

export default BadgeList
