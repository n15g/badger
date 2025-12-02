import { FC } from 'react'
import { Alignment, Badge, Sex } from 'coh-content-db'
import { SmartImage } from '../util/SmartImage.tsx'

const BadgeIcon: FC<{
  badge: Badge | undefined,
  alignment?: Alignment,
  sex?: Sex
}> = ({ badge, alignment, sex }) => {
  if (badge) {
    return <SmartImage
      src={badge.icon.getValue(alignment, sex)}
      alt={badge.name.getValue(alignment, sex)}
      sx={(theme) => {
        return {
          filter: `drop-shadow(0 0 4px ${theme.palette.text.icon})`,
        }
      }}
    />
  }
}
export default BadgeIcon
