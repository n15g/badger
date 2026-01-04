import { FC, ImgHTMLAttributes } from 'react'
import { SmartImage } from '../util/SmartImage.tsx'
import { Morality } from 'coh-content-db'
import heroIcon from '../../resources/images/icon/morality-hero.png'
import vigilanteIcon from '../../resources/images/icon/morality-vigilante.png'
import villainIcon from '../../resources/images/icon/morality-villain.png'
import rogueIcon from '../../resources/images/icon/morality-rogue.png'
import resistanceIcon from '../../resources/images/icon/morality-resistance.png'
import loyalistIcon from '../../resources/images/icon/morality-loyalist.png'
import { Icons } from '../util/Icons.tsx'

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

  return icon ? <SmartImage
    {...props}
    src={icon}
    sx={{
      filter: muted ? 'grayscale(1) brightness(0.4)' : undefined,
    }}
  /> : <Icons.Morality/>
}

export default MoralityIcon
