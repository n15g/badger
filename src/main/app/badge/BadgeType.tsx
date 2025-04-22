import { FC } from 'react'
import { Badge } from 'coh-content-db'
import { BadgeTypes } from './BadgeTypes.tsx'


const BadgeType: FC<{ badge: Badge }> = ({ badge }) => {
  return <>{BadgeTypes.get(badge.type)}</>
}
export default BadgeType
