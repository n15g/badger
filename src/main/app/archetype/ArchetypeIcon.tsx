import { FC } from 'react'
import { SmartImage } from '../util/SmartImage.tsx'
import { TbCircleDashedLetterA } from 'react-icons/tb'
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

const ArchetypeIcon: FC<{ archetypeKey: string, height?: string | number }> = ({ archetypeKey, height = 32 }) => {
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
  }[archetypeKey]

  return icon ? <SmartImage src={icon} style={{ height: height }}/> : <TbCircleDashedLetterA size={height}/>
}

export default ArchetypeIcon
