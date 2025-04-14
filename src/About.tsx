import { Box, Card, CardContent, CardOverflow, Stack, Typography } from '@mui/joy'
import BadgeIcon from './badge/BadgeIcon.tsx'
import homecomingLogo from './assets/images/logo/homecoming.png'
import DropShadowImage from './util/DropShadowImage.tsx'

function About() {
  return (
    <>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Card orientation={'horizontal'} sx={{ marginY: 8, maxWidth: 800 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography level="title-lg" sx={{ mb: 2 }}>
              Badger: Your City of Heroes Badge Tracker
            </Typography>

            <Typography>
              Built for the <a href="https://homecomingservers.com/">Homecoming</a> fork of the game,
              badger runs entirely in your browser, with no login or download needed.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a href="https://homecomingservers.com/"><DropShadowImage src={homecomingLogo} alt="Homecoming"/></a>
            </Box>
          </CardContent>
          <CardOverflow variant="soft" sx={{ display: { xs: 'none', sm: 'flex' }, padding: 4 }}>
            <Stack direction="column" gap={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <BadgeIcon badge="lobbyist" alignment="hero"/>
              <BadgeIcon badge="received-the-stalwart-medallion" alignment="hero"/>
              <BadgeIcon badge="vip" alignment="hero"/>
              <BadgeIcon badge="reunited" alignment="hero"/>
            </Stack>
          </CardOverflow>
        </Card>

      </Box>
    </>
  )
}

export default About
