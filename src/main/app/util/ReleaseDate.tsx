import { FC } from 'react'
import moment from 'moment'
import { Typography } from '@mui/joy'
import { Icons } from './Icons.tsx'

const ReleaseDate: FC<{ value: Date, format?: 'short' | 'long' }> = ({ value, format = 'short' }) => {
  return (
    <Typography component="span"
                level="body-sm"
                title="Release date"
                sx={{ fontStyle: 'italic' }}
                startDecorator={<Icons.ReleaseDate/>}>
      {moment(value).format(format === 'short' ? 'MMM Y' : 'Do MMM Y')}
    </Typography>
  )
}

export default ReleaseDate
