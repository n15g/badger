import { Alert, Box, Card, CardContent, CardOverflow, Stack, Typography } from '@mui/joy'
import BadgeIcon from './badge/BadgeIcon.tsx'
import homecomingLogo from '../resources/images/logo/homecoming.png'
import ContentProvider from './content/ContentProvider.tsx'
import MainSection from './util/MainSection.tsx'
import { NavLink } from 'react-router'
import { MdNewReleases } from 'react-icons/md'
import moment from 'moment'
import SmartLink from './util/SmartLink.tsx'
import { CgInfo } from 'react-icons/cg'
import { BiImport } from 'react-icons/bi'

function AboutPage() {
  const content = ContentProvider.useContent()

  return (
    <MainSection>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>

        <Card orientation={'horizontal'} sx={{ mt: 8, maxWidth: 800 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography level="title-lg" sx={{ mb: 2 }}>
              City of Heroes Badge Tracker
            </Typography>

            <SmartLink href="https://github.com/n15g/badger"/>

            <p>
              Built for the <a href="https://homecomingservers.com/">Homecoming</a> fork of the game,
              badger runs entirely in your browser, with no login or download needed.
            </p>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <a href="https://homecomingservers.com/">
                <img src={homecomingLogo} alt="Homecoming" width={200} style={{ filter: 'drop-shadow(0 0 4px)' }}/>
              </a>
            </Box>
            <p>
              Just create a character from the <NavLink to="/characters">Characters</NavLink> page and start collecting!
            </p>
          </CardContent>
          <CardOverflow variant="soft" sx={{ display: { xs: 'none', sm: 'flex' }, padding: 4 }}>
            <Stack direction="column" gap={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <BadgeIcon badge={content.getBadge('lobbyist')}/>
              <BadgeIcon badge={content.getBadge('received-the-stalwart-medallion')}/>
              <BadgeIcon badge={content.getBadge('vip')}/>
              <BadgeIcon badge={content.getBadge('reunited')}/>
            </Stack>
          </CardOverflow>
        </Card>

        <Alert color="primary">
          <Stack direction="row" flexWrap="wrap" justifyContent="center" columnGap={4}>
            <Typography>Content Version: {content.header.version}</Typography>
            <Typography>Last Updated: {moment(content.header.lastUpdateTime).fromNow()}</Typography>
          </Stack>
        </Alert>

        <Card color="success" sx={{ maxWidth: 800 }}>
          <Typography level="h4" textAlign="center"><MdNewReleases/> What's changed?</Typography>

          <Typography level="title-lg">
            In short... Everything!
          </Typography>

          <Typography>
            Badger has been rebuilt from the ground up to make it slicker, easier to maintain, and more useful.
          </Typography>
          <Typography>
            The original version was built with Angular, but over time it became almost impossible to update, and several components fell
            out of support. The rewrite moves Badger to React, which has proven to be more extensible, but also more efficient.
          </Typography>
          <Typography>
            Alongside the technical refresh, Badger now includes significantly expanded data...<br/>
            You’ll find new information on Contacts, Missions, and Zones, giving much deeper context on how badges are earned.
          </Typography>
          <Typography>
            The UI has also been improved across the board. You can now:
          </Typography>
          <ul>
            <li>Hover for quick tooltips with badge, contact, or mission details</li>
            <li>Find new badges by release date</li>
            <li>Import characters from multiple files/logs at once</li>
            <li>Copy /settitle and /thumbtack commands to the clipboard</li>
            <li>View badge icons and names based on your character's sex and morality</li>
            <li>Use the app reasonably well on mobile and tablet</li>
          </ul>
        </Card>

        <Card color="warning" sx={{ maxWidth: 800 }}>
          <Typography level="h4" textAlign="center"><BiImport/> Character Migration</Typography>

          <Typography level="title-lg">
            Your old characters should migrate across on first launch.
          </Typography>

          <Typography>
            The old data for Badger 1.0 will remain in the browser history even after migration, and if you want/need to re-import for any
            reason, just delete all characters from the character page and refresh the application.
          </Typography>
        </Card>

        <Card color="primary" sx={{ maxWidth: 800, minWidth: { md: 800 } }}>
          <Typography level="h4" textAlign="center"><CgInfo/> Contact</Typography>

          <Typography>
            If you encounter any issues, you can reach out via:
          </Typography>
          <ul>
            <li>
              <SmartLink href="https://github.com/n15g/badger">
                GitHub
              </SmartLink>
            </li>
            <li>
              <SmartLink href="https://forums.homecomingservers.com/profile/40470-keyboardkitsune/">
                KeyboardKitsune - Homecoming Forums
              </SmartLink>
            </li>
          </ul>

        </Card>

      </Box>
    </MainSection>
  )
}

export default AboutPage
