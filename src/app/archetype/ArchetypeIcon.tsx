import { FC, ImgHTMLAttributes } from 'react'
import { SmartImage } from '../util/SmartImage.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
import arachnosSoldierIcon from '../../assets/images/archetype/arachnos-soldier.png'
import arachnosWidowIcon from '../../assets/images/archetype/arachnos-widow.png'
import blasterIcon from '../../assets/images/archetype/blaster.png'
import bruteIcon from '../../assets/images/archetype/brute.png'
import controllerIcon from '../../assets/images/archetype/controller.png'
import corruptorIcon from '../../assets/images/archetype/corruptor.png'
import defenderIcon from '../../assets/images/archetype/defender.png'
import dominatorIcon from '../../assets/images/archetype/dominator.png'
import mastermindIcon from '../../assets/images/archetype/mastermind.png'
import peacebringerIcon from '../../assets/images/archetype/peacebringer.png'
import scrapperIcon from '../../assets/images/archetype/scrapper.png'
import sentinelIcon from '../../assets/images/archetype/sentinel.png'
import stalkerIcon from '../../assets/images/archetype/stalker.png'
import tankerIcon from '../../assets/images/archetype/tanker.png'
import warshadeIcon from '../../assets/images/archetype/warshade.png'

const ArchetypeIcon: FC<{ archetypeKey?: string } & ImgHTMLAttributes<HTMLImageElement>> = ({ archetypeKey, ...props }) => {
  const content = ContentProvider.useContent()
  const archetype = content.getArchetype(archetypeKey)

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
  }[archetypeKey ?? '']

  return icon
    ? <SmartImage
      {...props}
      src={icon}
      alt={archetype?.name}
      title={archetype?.name}
    />
    : undefined
}

export default ArchetypeIcon
