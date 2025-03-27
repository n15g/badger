import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'

const BadgeType: FC<{ badge: Badge }> = ({ badge }) => {
  return <Typography>
    {function() {
      switch (badge.type) {
        case 'EXPLORATION':
          return 'Exploration'
        case 'HISTORY':
          return 'History'
        case 'ACCOMPLISHMENT':
          return 'Accomplishment'
        case 'ACHIEVEMENT':
          return 'Achievement'
        case 'ACCOLADE':
          return 'Accolade'
        case 'GLADIATOR':
          return 'Gladiator'
        case 'VETERAN':
          return 'Veteran'
        case 'PVP':
          return 'PvP'
        case 'INVENTION':
          return 'Invention'
        case 'DEFEAT':
          return 'Defeat'
        case 'EVENT':
          return 'Event'
        case 'OUROBOROS':
          return 'Ouroboros'
        case 'CONSIGNMENT':
          return 'Consignment'
        case 'DAY_JOB':
          return 'Day Job'
        case 'AE':
          return 'Architect Entertainment'
        default:
          return badge.type
      }
    }()}
  </Typography>
}
export default BadgeType
