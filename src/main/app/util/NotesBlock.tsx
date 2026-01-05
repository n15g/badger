import { FC } from 'react'
import { Typography } from '@mui/joy'
import { Icons } from './Icons.tsx'
import { MarkdownString } from 'coh-content-db'
import BadgerMarkdown from './BadgerMarkdown.tsx'

const NotesBlock: FC<{ notes?: MarkdownString }> = ({ notes }) => {
  return (
    <>
      <Typography level="title-lg" startDecorator={<Icons.Notes/>}>Notes</Typography>
      <Typography component="span" level="body-md">
        {(!notes || notes === '') && (<>
          <p><em>None</em></p>
        </>)}
        {notes && (<>
          <BadgerMarkdown content={notes}/>
        </>)}
      </Typography>
    </>
  )
}

export default NotesBlock
