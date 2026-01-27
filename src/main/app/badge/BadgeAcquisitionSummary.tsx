import { FC } from 'react'
import { Badge, EnhancementCategory } from 'coh-content-db'
import { Typography } from '@mui/joy'
import BadgerMarkdown from '../util/BadgerMarkdown.tsx'
import LocationLink from '../location/LocationLink.tsx'
import ZoneLink from '../zone/ZoneLink.tsx'
import MissionLink from '../mission/MissionLink.tsx'
import BadgeLink from './BadgeLink.tsx'
import NaturalList from '../util/NaturalList.tsx'
import BadgeIconLink from './BadgeIconLink.tsx'
import EnhancementCategoryLabel from '../enhancement/EnhancementCategoryLabel.tsx'


const BadgeAcquisitionSummary: FC<{ badge: Badge }> = ({ badge }) => {
  const { type, acquisition, requirements, zoneKeys } = badge

  if (acquisition) {
    return <span className="no-p-padding"><BadgerMarkdown content={acquisition}/></span>
  }

  if (requirements.length === 1) {
    const requirement = requirements[0]

    if (requirement.type === 'badge') {
      return <>Collect <BadgeLink value={requirement.badgeKey}/>.</>
    } else if (requirement.type === 'mission') {
      return <>Complete <MissionLink value={requirement.missionKey}/>.</>
    } else if (requirement.type === 'location' && requirement.location?.length === 1) {
      return <>Visit <LocationLink location={requirement.location[0]}/>.</>
    }
  }

  if (requirements.length > 1) {
    if (requirements[0].type === 'badge') {
      const keys = [...requirements.reduce((set, requirement) => {
        if (requirement.badgeKey) {
          set.add(requirement.badgeKey)
        }
        return set
      }, new Set<string>())]

      return (<>
        Collect <NaturalList keys={keys} renderFn={(key) => <BadgeIconLink value={key} style={{ height: '1em' }}/>} cap={8}/>.
      </>)
    }

    if (requirements[0].type === 'mission') {
      const keys = [...requirements.reduce((set, requirement) => {
        if (requirement.missionKey) {
          set.add(requirement.missionKey)
        }
        return set
      }, new Set<string>())]

      return (<>
        Complete <NaturalList keys={keys} renderFn={(key) => <MissionLink value={key}/>} cap={3}/>.
      </>)
    }
  }

  if (type === 'exploration') {
    return <>Visit locations in <NaturalList keys={zoneKeys} renderFn={(key) => <ZoneLink value={key}/>} cap={5}/>.</>
  }

  if (type === 'history') {
    return <>Visit monuments in <NaturalList keys={zoneKeys} renderFn={(key) => <ZoneLink value={key}/>} cap={5}/>.</>
  }

  if (type === 'invention') {
    const { levels, types } = requirements.reduce<
      { levels: [number, number][], types: Set<EnhancementCategory> }
    >((acc, requirement) => {
      if (requirement.inventionLevel) {
        acc.levels.push([requirement.inventionLevel, requirement.count ?? 0])
      }
      requirement.inventionTypes?.forEach((type) => acc.types.add(type))
      if (requirement.type === 'invention-plus-one') {
        acc.levels.push([-1, 1])
      }
      return acc
    }, { levels: [], types: new Set<EnhancementCategory>() })

    return (<>
      Craft {' '}
      <NaturalList keys={[...levels].map((x) => x[0] !== -1 ? `${x[1]}xLv${x[0]}` : '1 extra')} renderFn={(x) => <strong>{x}</strong>}/>
      {' '}
      <NaturalList keys={[...types]} renderFn={(key) => <EnhancementCategoryLabel value={key}/>} conjunction="or"/>
      {' '}
      enhancement{levels.every((x) => x[1] === 1) ? '' : 's'}.
    </>)
  }

  return <Typography color="neutral" fontStyle="italic">See details.</Typography>
}

export default BadgeAcquisitionSummary
