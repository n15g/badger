import { Box, Card, CardContent, CardOverflow, Stack, Typography } from '@mui/joy'
import BadgeIcon from './badge/BadgeIcon.tsx'
import homecomingLogo from '../resources/images/logo/homecoming.png'
import DropShadowImage from './util/DropShadowImage.tsx'
import ContentProvider from './content/ContentProvider.tsx'
import MainSection from './util/MainSection.tsx'
import { NavLink } from 'react-router'

function AboutPage() {
  const content = ContentProvider.useContent()

  return (
    <MainSection>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Card orientation={'horizontal'} sx={{ marginY: 8, maxWidth: 800 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography level="title-lg" sx={{ mb: 2 }}>
              City of Heroes Badge Tracker
            </Typography>

            <p>
              Built for the <a href="https://homecomingservers.com/">Homecoming</a> fork of the game,
              badger runs entirely in your browser, with no login or download needed.
            </p>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a href="https://homecomingservers.com/">
                <DropShadowImage src={homecomingLogo} alt="Homecoming" width={200}/>
              </a>
            </Box>
            <p>
              Just create a character from the <NavLink to="/characters">Characters</NavLink> page and start collecting!
            </p>

          </CardContent>
          <CardOverflow variant="soft" sx={{ display: { xs: 'none', sm: 'flex' }, padding: 4 }}>
            <Stack direction="column" gap={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <BadgeIcon badge={content.getBadge('lobbyist')} alignment="hero"/>
              <BadgeIcon badge={content.getBadge('received-the-stalwart-medallion')} alignment="hero"/>
              <BadgeIcon badge={content.getBadge('vip')} alignment="hero"/>
              <BadgeIcon badge={content.getBadge('reunited')} alignment="hero"/>
            </Stack>
          </CardOverflow>
        </Card>

      </Box>
    </MainSection>
  )
}

export default AboutPage
