import { FC } from 'react'
import { Card, List, ListItem, Typography } from '@mui/joy'
import { Icons } from './Icons.tsx'
import SmartLink from './SmartLink.tsx'
import { Link } from 'coh-content-db'

const LinksBlock: FC<{ links: Link[] }> = ({ links }) => {
  return (
    <Card variant="soft">
      <Typography level="title-lg" startDecorator={<Icons.Link/>}>Links</Typography>
      <Typography component="span" level="body-sm">
        {links.length === 0 && (<>
          <em>None</em>
        </>)}
        {links.length > 0 && (<>
          <List component="ol" marker="lower-roman">
            {links.map(link => (
              <ListItem key={link.href}>
                <Typography startDecorator={<Icons.Link/>}><SmartLink href={link.href}>{link.title}</SmartLink></Typography>
              </ListItem>
            ))}
          </List>
        </>)}
      </Typography>
    </Card>
  )
}

export default LinksBlock
