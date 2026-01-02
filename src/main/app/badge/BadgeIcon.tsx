import { FC, ImgHTMLAttributes } from 'react'
import { Badge, VariantContext } from 'coh-content-db'
import { SmartImage } from '../util/SmartImage.tsx'

const BadgeIcon: FC<{ badge: Badge | undefined, context?: VariantContext } & ImgHTMLAttributes<HTMLImageElement>>
  = ({ badge, context, ...props }) => {
  if (badge) {
    return <SmartImage
      src={badge.icon.getValue(context)}
      alt={badge.name.getValue(context)}
      sx={(theme) => {
        return {
          filter: `drop-shadow(0 0 4px ${theme.palette.text.icon})`,
        }
      }}
      {...props}
    />
  }
}
export default BadgeIcon
