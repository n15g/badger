import { Box, Card, styled, Table } from '@mui/joy'
import ContentService from './ContentService.ts'
import { BadgeSearchOptions } from '../../coh-content-db'
import BadgeIcon from './badge/BadgeIcon.tsx'
import Pagination from './util/Pagination.tsx'
import { useSessionStorage } from './util/use-session-storage.ts'

const TD = styled('td')(() => ({}))
const TH = styled('th')(() => ({}))

function BadgeList() {
  const [searchOptions, setSearchOptions] = useSessionStorage<BadgeSearchOptions>('badge-list-parameters', {
    query: { on: { name: true } },
    pageSize: 10
  })
  const badges = ContentService.db.searchBadges(searchOptions)

  return (
    <>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Card sx={{ marginY: 8, maxWidth: 1800 }}>
          <Pagination paged={badges} onChange={(page, pageSize) => {
            setSearchOptions({ ...searchOptions, page: page, pageSize: pageSize })
          }}/>

          <Table noWrap={true}>
            <thead>
            <tr>
              <TH sx={{ width: 200 }}>Icon</TH>
              <TH>Name</TH>
              <TH sx={{ display: { sm: 'none', xs: 'none', md: 'table-cell' } }}>Description</TH>
            </tr>
            </thead>
            <tbody>
            {badges.items.map(badge => (
              <tr key={badge.key}>
                <TD style={{ height: 80 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <BadgeIcon badge={badge}/>
                  </Box>
                </TD>
                <TD>
                  {badge.name.default}
                </TD>
                <TD sx={{ display: { sm: 'none', xs: 'none', md: 'table-cell' } }}>
                  {badge.badgeText.default}
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
