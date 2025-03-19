import { Box, Card, CardContent, CardOverflow, Stack, Typography } from '@mui/joy'
import BadgeIcon from './badge/BadgeIcon.tsx'
import homecomingLogo from './assets/homecoming.png'
import { NavLink } from 'react-router'
import DropShadowImage from './util/DropShadowImage.tsx'

function About() {
  return (
    <>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Card orientation={'horizontal'} sx={{ marginY: 8, maxWidth: 800 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography level="body-md">
              Badger is a badge database and tracker application for City of Heroes badge hunters designed for the&nbsp;
              <a href="https://homecomingservers.com/">Homecoming</a> fork of the game.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a href="https://homecomingservers.com/"><DropShadowImage src={homecomingLogo} alt="Homecoming"/></a>
            </Box>

            <Typography>
              Badger runs entirely in the browser, on your own local data, so no download or login is required, just <NavLink
              to="/characters">create a character</NavLink> to get started.
            </Typography>
          </CardContent>
          <CardOverflow variant="soft" sx={{ display: { xs: 'none', sm: 'flex' }, padding: 4 }}>
            <Stack direction="column" gap={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <BadgeIcon badge="lobbyist" alignment="H"/>
              <BadgeIcon badge="received-the-stalwart-medallion" alignment="H"/>
              <BadgeIcon badge="vip" alignment="H"/>
              <BadgeIcon badge="reunited" alignment="H"/>
            </Stack>
          </CardOverflow>
        </Card>

      </Box>
    </>
  )
}

export default About
