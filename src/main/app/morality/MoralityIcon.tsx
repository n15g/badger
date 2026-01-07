import { FC, ImgHTMLAttributes } from 'react'
import { SmartImage } from '../util/SmartImage.tsx'
import { Morality } from 'coh-content-db'
import heroIcon from '../../resources/images/icon/morality-hero.png'
import vigilanteIcon from '../../resources/images/icon/morality-vigilante.png'
import villainIcon from '../../resources/images/icon/morality-villain.png'
import rogueIcon from '../../resources/images/icon/morality-rogue.png'
import resistanceIcon from '../../resources/images/icon/morality-resistance.png'
import loyalistIcon from '../../resources/images/icon/morality-loyalist.png'
import { MoralityLabels } from './MoralityLabels.tsx'

const MoralityIcon: FC<{ morality: Morality, muted?: boolean } & ImgHTMLAttributes<HTMLImageElement>>
  = ({ morality, muted = false, ...props }) => {
  const icon = {
    hero: heroIcon,
    vigilante: vigilanteIcon,
    villain: villainIcon,
    rogue: rogueIcon,
    resistance: resistanceIcon,
    loyalist: loyalistIcon
  }[morality]

  return icon
    ? <SmartImage
      {...props}
      src={icon}
      alt={MoralityLabels.get(morality)}
      title={MoralityLabels.get(morality)}
      sx={{
        filter: muted ? 'grayscale(1) brightness(0.4)' : undefined,
      }}
    />
    : undefined
}

export default MoralityIcon
