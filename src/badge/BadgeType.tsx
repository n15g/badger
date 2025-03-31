import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'

const BadgeType: FC<{ badge: Badge }> = ({ badge }) => {
  return <Typography>
    {{
      'EXPLORATION': 'Exploration',
      'HISTORY': 'History',
      'ACCOMPLISHMENT': 'Accomplishment',
      'ACHIEVEMENT': 'Achievement',
      'ACCOLADE': 'Accolade',
      'GLADIATOR': 'Gladiator',
      'VETERAN': 'Veteran',
      'PVP': 'PvP',
      'INVENTION': 'Invention',
      'DEFEAT': 'Defeat',
      'EVENT': 'Event',
      'OUROBOROS': 'Ouroboros',
      'CONSIGNMENT': 'Consignment',
      'DAY_JOB': 'Day Job',
      'AE': 'Architect Entertainment',
    }[badge.type] || badge.type}
  </Typography>
}
export default BadgeType
