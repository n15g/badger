import { FC } from 'react'
import { Badge } from 'coh-content-db'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import { Typography } from '@mui/joy'
import BadgeLink from './BadgeLink.tsx'


const BadgeAcquisitionSummary: FC<{ badge: Badge }> = ({ badge }) => {
  const { acquisition, requirements, notes } = badge

  if (acquisition) {
    return <BadgerMarkdown content={acquisition}/>
  }

  if (requirements.length) {
    if (requirements.length === 1) {
      const requirement = requirements[0]
      switch (requirement.type) {
        case 'badge':
          return <>Acquire the <BadgeLink value={badge}/> badge.</>
        case 'invention':
          break
        case 'invention-plus-one':
          break
        case 'location':
          break
        case 'monument':
          break
        case 'mission':
          break
        case 'task':
          break
        default:
          return
      }
    }
  }

  if (notes) {
    return <Typography color="neutral" fontStyle="italic">See notes</Typography>
  }

  return <Typography color="neutral" fontStyle="italic">Unknown</Typography>
}

export default BadgeAcquisitionSummary
