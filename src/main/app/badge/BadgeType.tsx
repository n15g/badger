import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { Typography } from '@mui/joy'

const BadgeType: FC<{ badge: Badge }> = ({ badge }) => {
  return <Typography>
    {{
      'exploration': 'Exploration',
      'history': 'History',
      'accomplishment': 'Accomplishment',
      'achievement': 'Achievement',
      'accolade': 'Accolade',
      'gladiator': 'Gladiator',
      'veteran': 'Veteran',
      'pvp': 'PvP',
      'invention': 'Invention',
      'defeat': 'Defeat',
      'event': 'Event',
      'ouroboros': 'Ouroboros',
      'consignment': 'Consignment',
      'day-job': 'Day Job',
      'architect-entertainment': 'Architect Entertainment',
    }[badge.type] || badge.type}
  </Typography>
}
export default BadgeType
