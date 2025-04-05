import { Alert, Box, Card, Typography } from '@mui/joy'
import { useParams } from 'react-router'
import ContentService from '../ContentService.ts'
import BadgeName from './BadgeName.tsx'
import BadgeIcon from './BadgeIcon.tsx'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'

function BadgeList() {
  const params = useParams()

  try {
    const badge = ContentService.db.getBadge(params.badgeKey)

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
  } catch {
    return (
      <Box component="section" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        Unknown badge: {params.badgeKey}
      </Box>
    )
  }
}

export default BadgeList
