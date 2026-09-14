import { FC, ReactElement } from 'react'
import { Contact } from 'coh-content-db'
import { Card, CardOverflow, Divider, Stack, Tooltip, TooltipProps, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import LocationLink from '../location/LocationLink.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'

const ContactTooltip: FC<{ contact: Contact, children: ReactElement } & Omit<TooltipProps, 'title'>>
  = ({ contact, children, ...props }) => {
  const { name, title, location, levelRange, morality } = contact

  const content = (
    <Card variant="plain" sx={{ minWidth: 280, maxWidth: 320, alignItems: 'center' }}>
      <CardOverflow sx={{ alignItems: 'center' }}>
        <Typography level="title-sm" startDecorator={<Icons.Contact/>} sx={{ p: 1 }}>
          Contact
        </Typography>
        <Divider inset="context"/>
      </CardOverflow>


      <NavLink to={`/contacts/${contact.key}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography textAlign="center" level="title-lg">{name}</Typography>
      </NavLink>

      {title && (<>
        <Typography level="title-sm" sx={{ fontStyle: 'italic' }}>{title}</Typography>
      </>)}

      {location && (<>
        <Divider/>
        <LocationLink location={location}/>
      </>)}

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={morality}/>
          {levelRange && <div style={{ marginLeft: 'auto' }}><LevelRangeLabel value={levelRange}/></div>}
        </Stack>
      </CardOverflow>
    </Card>
  )

  return (
    <Tooltip {...props} title={content} variant="outlined" enterDelay={500} enterNextDelay={500} sx={{ p: 0 }}>
      {children}
    </Tooltip>
  )
}

export default ContactTooltip
