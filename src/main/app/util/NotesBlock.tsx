import { FC } from 'react'
import { Card, Typography } from '@mui/joy'
import { Icons } from './Icons.tsx'
import { MarkdownString } from 'coh-content-db'
import BadgerMarkdown from './BadgerMarkdown.tsx'

const NotesBlock: FC<{ notes?: MarkdownString }> = ({ notes }) => {
  return (
    <Card variant="soft">
      <Typography level="title-lg" startDecorator={<Icons.Notes/>}>Notes</Typography>
      <Typography component="span" level="body-md">
        {(!notes || notes === '') && (<>
          <p><em>None</em></p>
        </>)}
        {notes && (<>
          <BadgerMarkdown content={notes}/>
        </>)}
      </Typography>
    </Card>
  )
}

export default NotesBlock
