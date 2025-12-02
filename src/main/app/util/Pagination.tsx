import { Button, ButtonGroup, Option, Select, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import { Paged } from 'coh-content-db'
import { Icons } from './Icons.tsx'


const Pagination: FC<{ paged: Paged<unknown>, range?: number, onChange: (page: number, pageSize: number | undefined) => void }>
  = ({ paged, range = 5, onChange }) => {

  const showPages = []
  const halfRange = Math.floor(range / 2)

  let start = Math.max(paged.page - halfRange, 1)
  if (start + range - 1 > paged.totalPages) {
    start = Math.max(paged.totalPages - range + 1, 1)
  }
  for (let i = start; i < start + range && i <= paged.totalPages; i++) {
    showPages.push(i)
  }

  return <Stack direction={{ md: 'row' }} justifyContent="space-between" alignItems="center" gap={4}>
    <ButtonGroup>
      <Button onClick={() => {
        onChange(1, paged.pageSize)
      }} disabled={paged.page === 1}
              title="First">
        <Icons.First/>
      </Button>

      <Button onClick={() => {
        onChange(paged.page - 1, paged.pageSize)
      }} disabled={paged.page === 1}
              title="Previous">
        <Icons.Prev/>
      </Button>

      {showPages.map(index => (
        <Button key={index}
                sx={{ display: { xs: index === paged.page ? 'inline-block' : 'none', sm: 'inline-block' }, minWidth: '4em' }}
                disabled={index === paged.page}
                variant={index === paged.page ? 'solid' : 'plain'}
                onClick={() => {
                  onChange(index, paged.pageSize)
                }}>
          {index}
        </Button>
      ))}

      <Button onClick={() => {
        onChange(paged.page + 1, paged.pageSize)
      }} disabled={paged.page >= paged.totalPages}
              title="Next">
        <Icons.Next/>
      </Button>

      <Button onClick={() => {
        onChange(paged.totalPages, paged.pageSize)
      }} disabled={paged.page >= paged.totalPages}
              title="Last">
        <Icons.Last/>
      </Button>
    </ButtonGroup>
    <Stack direction="row" gap={4} alignItems="center">
      <Typography level="title-sm">{paged.totalPages} Page{paged.totalPages === 1 ? '' : 's'}</Typography>

      <Select value={paged.pageSize ?? 0} onChange={(_, value) => {
        onChange(paged.page, value ?? undefined)
      }}>
        <Option value={8}>8 items per page</Option>
        <Option value={20}>20 items per page</Option>
        <Option value={50}>50 items per page</Option>
        <Option value={100}>100 items per page</Option>
        <Option value={0}>All items</Option>
      </Select>
    </Stack>
  </Stack>
}

export default Pagination
