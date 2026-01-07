import { FC, ImgHTMLAttributes } from 'react'
import { SmartImage } from '../util/SmartImage.tsx'
import ContentProvider from '../content/ContentProvider.tsx'
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

const ArchetypeIcon: FC<{ archetypeKey: string } & ImgHTMLAttributes<HTMLImageElement>> = ({ archetypeKey, ...props }) => {
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
  }[archetypeKey]

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
