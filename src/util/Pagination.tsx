import { Button, ButtonGroup, Option, Select, Stack, Typography } from '@mui/joy'
import { FC } from 'react'
import { Paged } from '../../../coh-content-db'
import { GoChevronLeft, GoChevronRight, GoMoveToEnd, GoMoveToStart } from 'react-icons/go'


const Pagination: FC<{ paged: Paged<unknown>, range?: number, onChange: (page: number, pageSize: number | undefined) => void }>
  = ({ paged, range = 5, onChange }) => {

  const showPages = []
  const halfRange = Math.floor(range / 2)

// Calculate the starting index
  let start = Math.max(
    paged.page - halfRange,        // Center the active page
    1                              // Ensure it doesn't go below 1
  )

  // Adjust if we are near the end
  if (start + range - 1 > paged.totalPages) {
    start = Math.max(paged.totalPages - range + 1, 1)
  }

  // Populate the showPages array
  for (let i = start; i < start + range && i <= paged.totalPages; i++) {
    showPages.push(i)
  }

  return <Stack direction="row" justifyContent="space-between">
    <ButtonGroup>
      <Button onClick={() => {
        onChange(1, paged.pageSize)
      }} disabled={paged.page === 1}><GoMoveToStart/></Button>

      <Button onClick={() => {
        onChange(paged.page - 1, paged.pageSize)
      }} disabled={paged.page === 1}><GoChevronLeft/></Button>

      {showPages.map(index => (
        <Button key={index}
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
      }} disabled={paged.page === paged.totalPages}><GoChevronRight/></Button>

      <Button onClick={() => {
        onChange(paged.totalPages, paged.pageSize)
      }} disabled={paged.page === paged.totalPages}><GoMoveToEnd/></Button>
    </ButtonGroup>
    <Typography level="title-sm">{paged.totalPages} Page{paged.totalPages === 1 ? '' : 's'}</Typography>

    <Select value={paged.pageSize ?? 0} onChange={(_, value) => {
      onChange(paged.page, value ?? undefined)
    }}>
      <Option value={0}>All items</Option>
      <Option value={10}>10 items per page</Option>
      <Option value={20}>20 items per page</Option>
      <Option value={50}>50 items per page</Option>
      <Option value={100}>100 items per page</Option>
    </Select>
  </Stack>
}

export default Pagination
