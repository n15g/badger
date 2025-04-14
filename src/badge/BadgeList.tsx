import { Box, Card, Input, Stack, styled, Table } from '@mui/joy'
import { NavLink } from 'react-router'
import { useSessionStorage } from '../util/use-session-storage.ts'
import Pagination from '../util/Pagination.tsx'
import ContentService from '../ContentService.ts'
import BadgeName from './BadgeName.tsx'
import BadgeType from './BadgeType.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import { BadgeSearchOptions } from 'coh-content-db'
import { FC, ReactNode } from 'react'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import MoralityListIcons from '../util/MoralityListIcons.tsx'

const TD = styled('td')(() => ({}))
const TH = styled('th')(() => ({}))
const hideOnSmall = { display: { xs: 'none', md: 'table-cell' } }


function BadgeList() {
  const [searchOptions, setSearchOptions] = useSessionStorage<BadgeSearchOptions>('badge-list-parameters', {
    query: { on: { name: true } },
    pageSize: 8
  })
  const badges = ContentService.db.searchBadges(searchOptions)

  return (
    <>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ my: 8, mx: 2, maxWidth: 1800, }}>
          <Input value={searchOptions.query?.str} onChange={(event,) => {
            setSearchOptions({ ...searchOptions, query: { str: event.target.value } })
          }}></Input>
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
                      <BadgeIcon badge={badge} default/>
                    </Box>
                  </RowLink>
                </TD>
                <TD className="game-text">
                  <RowLink to={badge.key}>
                    <BadgeName badge={badge} direction="column"/>
                  </RowLink>
                </TD>
                <TD sx={{ ...hideOnSmall }}>
                  <RowLink to={badge.key}>
                    <Stack direction="column" spacing={2} alignItems="center">
                      <BadgeType badge={badge}/>
                      <MoralityListIcons moralityList={badge.morality}/>
                    </Stack>
                  </RowLink>
                </TD>
                <TD sx={{ ...hideOnSmall }}>
                  <BadgerMarkdown content={badge.acquisition}></BadgerMarkdown>
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

      </Box>
    </>
  )
}

const RowLink: FC<{ children: ReactNode, to: string }> = ({ children, to }) => {
  return <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    {children}
  </NavLink>
}

export default BadgeList
