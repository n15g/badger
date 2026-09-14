import { Box, Card, Divider, Typography } from '@mui/joy'
import MainSection from './util/MainSection.tsx'
import ContentSourceConfig from './content/ContentSourceConfig.tsx'

function Settings() {
  return (
    <MainSection>
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>

        <Card sx={{ mt: 8, minWidth: { xs: 320, sm: 480, md: 600 }, maxWidth: 800 }}>
          <Typography level="h4">
            Settings
          </Typography>

          <Divider/>

          <Typography level="title-lg">
            Content Source
          </Typography>
          <ContentSourceConfig/>
        </Card>
      </Box>
    </MainSection>
  )
}

export default Settings
