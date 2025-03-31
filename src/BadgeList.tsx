import { Box, Card, Input, styled, Table } from '@mui/joy'
import ContentService from './ContentService.ts'
import { BadgeSearchOptions } from '../../coh-content-db'
import BadgeIcon from './badge/BadgeIcon.tsx'
import Pagination from './util/Pagination.tsx'
import { useSessionStorage } from './util/use-session-storage.ts'
import BadgeName from './badge/BadgeName.tsx'
import BadgeAlignment from './badge/BadgeAlignment.tsx'
import BadgeType from './badge/BadgeType.tsx'
import BadgeMarkdown from './util/BadgeMarkdown.tsx'

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
              <TH sx={{ width: { xs: 120, md: 200 } }}>Icon</TH>
              <TH sx={{ width: { xs: 120, md: 240 } }}>Name</TH>
              <TH sx={{ ...hideOnSmall, width: 200 }}>Type</TH>
              <TH sx={{ ...hideOnSmall, width: 100 }}>Alignments</TH>
              <TH sx={{ ...hideOnSmall }}>Acquisition</TH>
            </tr>
            </thead>
            <tbody>
            {badges.items.map(badge => (
              <tr key={badge.key}>
                <TD style={{ height: 100 }} sx={{ overflowX: 'hidden' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BadgeIcon badge={badge} defaultIcon/>
                  </Box>
                </TD>
                <TD>
                  <BadgeName badge={badge}/>
                </TD>
                <TD sx={{ ...hideOnSmall }}>
                  <BadgeType badge={badge}/>
                </TD>
                <TD sx={{ ...hideOnSmall }}>
                  <BadgeAlignment badge={badge}/>
                </TD>
                <TD sx={{ ...hideOnSmall }}>
                  <BadgeMarkdown content={badge.acquisition ?? badge.notes}/>
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

export default BadgeList
