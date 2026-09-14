import { Button, ButtonGroup, Option, Select, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import { Paged } from 'coh-content-db'
import { Icons } from './Icons.tsx'


const Pagination: FC<{ paged: Paged<unknown>, range?: number, onChange: (page: number, pageSize: number | undefined) => void }>
  = ({ paged, range = 5, onChange }) => {

  const showPages = []
  const halfRange = Math.floor(range / 2)

  let start = Math.max(paged.pageNumber - halfRange, 1)
  if (start + range - 1 > paged.totalPageCount) {
    start = Math.max(paged.totalPageCount - range + 1, 1)
  }
  for (let i = start; i < start + range && i <= paged.totalPageCount; i++) {
    showPages.push(i)
  }

  return <Stack direction={{ md: 'row' }} justifyContent="space-between" alignItems="center" gap={2}>
    <ButtonGroup>
      <Button onClick={() => {
        onChange(1, paged.pageSize)
      }} disabled={paged.pageNumber === 1}
              title="First">
        <Icons.First/>
      </Button>

      <Button onClick={() => {
        onChange(paged.pageNumber - 1, paged.pageSize)
      }} disabled={paged.pageNumber === 1}
              title="Previous">
        <Icons.Prev/>
      </Button>

      {showPages.map(index => (
        <Button key={index}
                sx={{ display: { xs: index === paged.pageNumber ? 'inline-block' : 'none', md: 'inline-block' }, minWidth: '4em' }}
                disabled={index === paged.pageNumber}
                variant={index === paged.pageNumber ? 'solid' : 'plain'}
                onClick={() => {
                  onChange(index, paged.pageSize)
                }}>
          {index}
        </Button>
      ))}

      <Button onClick={() => {
        onChange(paged.pageNumber + 1, paged.pageSize)
      }} disabled={paged.pageNumber >= paged.totalPageCount}
              title="Next">
        <Icons.Next/>
      </Button>

      <Button onClick={() => {
        onChange(paged.totalPageCount, paged.pageSize)
      }} disabled={paged.pageNumber >= paged.totalPageCount}
              title="Last">
        <Icons.Last/>
      </Button>
    </ButtonGroup>

    <Typography>
      {paged.matchedItemCount} Item{paged.matchedItemCount === 1 ? '' : 's'}
      {paged.matchedItemCount !== paged.totalItemCount && <> ({paged.totalItemCount - paged.matchedItemCount} filtered)</>}
    </Typography>

    <Stack direction="row" columnGap={2} alignItems="center" sx={{ ml: { md: 'auto' } }}>
      <Typography level="title-sm">{paged.totalPageCount} Page{paged.totalPageCount === 1 ? '' : 's'}</Typography>

      <Select value={paged.pageSize ?? 0} onChange={(_, value) => {
        onChange(paged.pageNumber, value ?? undefined)
      }}>
        <Option value={20}>20 items per page</Option>
        <Option value={50}>50 items per page</Option>
        <Option value={100}>100 items per page</Option>
        <Option value={0}>All items</Option>
      </Select>
    </Stack>
  </Stack>
}

export default Pagination
