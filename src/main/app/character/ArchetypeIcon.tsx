import { FC, ImgHTMLAttributes } from 'react'
import { Tooltip } from '@mui/joy'
import { Archetype } from 'coh-content-db'
import { SxProps } from '@mui/joy/styles/types'
import arachnosSoldierIcon from '../../resources/images/archetype/arachnos-soldier.png'
import arachnosWidowIcon from '../../resources/images/archetype/arachnos-widow.png'
import blasterIcon from '../../resources/images/archetype/blaster.png'
import bruteIcon from '../../resources/images/archetype/brute.png'
import controllerIcon from '../../resources/images/archetype/controller.png'
import corruptorIcon from '../../resources/images/archetype/corruptor.png'
import defenderIcon from '../../resources/images/archetype/defender.png'
import dominatorIcon from '../../resources/images/archetype/dominator.png'
import mastermindIcon from '../../resources/images/archetype/mastermind.png'
import peacebringerIcon from '../../resources/images/archetype/peacebringer.png'
import scrapperIcon from '../../resources/images/archetype/scrapper.png'
import sentinelIcon from '../../resources/images/archetype/sentinel.png'
import stalkerIcon from '../../resources/images/archetype/stalker.png'
import tankerIcon from '../../resources/images/archetype/tanker.png'
import warshadeIcon from '../../resources/images/archetype/warshade.png'
import { SmartImage } from '../util/SmartImage.tsx'

const ArchetypeIcon: FC<{ archetype: Archetype, sx?: SxProps } & ImgHTMLAttributes<HTMLImageElement>>
  = ({ archetype, sx, ...props }) => {

  const icon = {
    'arachnos-soldier': arachnosSoldierIcon,
    'arachnos-widow': arachnosWidowIcon,
    'blaster': blasterIcon,
    'brute': bruteIcon,
    'controller': controllerIcon,
    'corruptor': corruptorIcon,
    'defender': defenderIcon,
    'dominator': dominatorIcon,
    'mastermind': mastermindIcon,
    'peacebringer': peacebringerIcon,
    'scrapper': scrapperIcon,
    'sentinel': sentinelIcon,
    'stalker': stalkerIcon,
    'tanker': tankerIcon,
    'warshade': warshadeIcon,
  }[archetype.key]

  return (
    <Tooltip title={archetype.name}>
      <SmartImage src={icon} alt="Icon" sx={sx} {...props}/>
    </Tooltip>
  )
}

export default ArchetypeIcon
