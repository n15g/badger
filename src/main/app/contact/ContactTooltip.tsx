import { FC } from 'react'
import { Contact } from 'coh-content-db'
import { Breadcrumbs, Card, CardOverflow, Divider, Stack, Typography } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { NavLink } from 'react-router'
import MoralityListIcons from '../morality/MoralityListIcons.tsx'
import LocationLink from '../location/LocationLink.tsx'
import LevelRangeLabel from '../util/LevelRangeLabel.tsx'

const ContactTooltip: FC<{ contact: Contact }> = ({ contact }) => {
  const { name, title, location, levelRange, morality } = contact

  return (
    <Card sx={{ minWidth: 260, maxWidth: 320, p: 2, borderRadius: '1em', boxShadow: '10' }}>
      <CardOverflow>
        <Breadcrumbs separator={<Icons.Breadcrumb/>}>
          <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
            <Typography level="title-sm" startDecorator={<Icons.Contact/>}>Contacts</Typography>
          </NavLink>
          <Typography level="title-sm">Contact</Typography>
        </Breadcrumbs>
        <Divider inset="context"/>
      </CardOverflow>


      <Stack direction="column" spacing={1} alignItems="center">
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
      </Stack>

      <CardOverflow sx={{ py: 1 }}>
        <Divider inset="context"/>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1 }}>
          <MoralityListIcons moralityList={morality}/>
          {levelRange && <div style={{ marginLeft: 'auto' }}><LevelRangeLabel value={levelRange}/></div>}
        </Stack>
      </CardOverflow>
    </Card>
  )
}

export default ContactTooltip
