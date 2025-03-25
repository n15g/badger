import { Box, Card, styled, Table } from '@mui/joy'
import ContentService from './ContentService.ts'
import { BadgeSearchOptions } from '../../coh-content-db'
import BadgeIcon from './badge/BadgeIcon.tsx'
import Pagination from './util/Pagination.tsx'
import { useSessionStorage } from './util/use-session-storage.ts'

const Td = styled('td')(() => ({}))
const Th = styled('th')(() => ({}))

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
              <Th sx={{ width: 200 }}>Icon</Th>
              <Th>Name</Th>
              <Th sx={{ display: { sm: 'none', xs: 'none', md: 'table-cell' } }}>Description</Th>
            </tr>
            </thead>
            <tbody>
            {badges.items.map(badge => (
              <tr key={badge.key}>
                <Td><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><BadgeIcon badge={badge}/></Box></Td>
                <Td>{badge.name.default}</Td>
                <Td sx={{ display: { sm: 'none', xs: 'none', md: 'table-cell' } }}>{badge.badgeText.default}</Td>
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
