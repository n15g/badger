import { Alert, Box, Card, Typography } from '@mui/joy'
import { useParams } from 'react-router'
import BadgeName from './BadgeName.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import ContentProvider from '../content/ContentProvider.tsx'

function BadgeList() {
  const { content } = ContentProvider.useContent()
  const params = useParams()

  const badge = content.getBadge(params.badgeKey)

  if (badge) {
    return (
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card>
          <BadgeIcon badge={badge}/>
          <Typography level="h1"><BadgeName badge={badge}/></Typography>
          {badge.badgeText.canonical.map((alternate) => (
            <Alert key={`${alternate.sex ?? ''}:${alternate.alignment ?? ''}:${alternate.value}`}>
              <BadgerMarkdown content={alternate.value}/>
            </Alert>
          ))}

          <BadgerMarkdown content={badge.acquisition}/>
          <BadgerMarkdown content={badge.notes}/>
        </Card>
      </Box>
    )
  } else {
    return (
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        Unknown badge: {params.badgeKey}
      </Box>
    )
  }
}

export default BadgeList
