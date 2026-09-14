import { FC, ImgHTMLAttributes } from 'react'
import { Badge, VariantContext } from 'coh-content-db'
import { SmartImage } from '../util/SmartImage.tsx'

const BadgeIcon: FC<{ badge: Badge | undefined, context?: VariantContext, muted?: boolean } & ImgHTMLAttributes<HTMLImageElement>>
  = ({ badge, context, muted = false, ...props }) => {
  if (badge) {
    return <SmartImage
      src={badge.icon.getValue(context)}
      alt=""
      sx={{
        filter: muted ? 'grayscale(1) brightness(0.4)' : undefined,
      }}
      {...props}
    />
  }
}
export default BadgeIcon
