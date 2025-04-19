// noinspection JSUnusedGlobalSymbols

import LocationInfo from './LocationInfo.tsx'
import { CohContentDatabase, Location } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'

const content = new CohContentDatabase(HOMECOMING)

export default {
  title: 'location/LocationInfo',
  component: LocationInfo,
}

export const All = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'badge', iconText: '2' })
  },
}

export const Very_Long = {
  args: {
    location: new Location({
      zoneKey: 'architect-entertainment-buildings',
      coords: [9999.9, -9999.9, 9999.9],
      icon: 'badge',
      iconText: 'X'
    })
  },
}

export const Just_Zone = {
  args: {
    location: new Location({ zoneKey: 'atlas-park' })
  },
}

export const Just_Coords = {
  args: {
    location: new Location({ coords: [1, -2, 3.5] })
  },
}

export const Badge = {
  args: {
    location: content.getBadge('asunder')?.getRequirement('loc-0')?.location?.[0]
  },
}

export const Plaque = {
  args: {
    location: content.getBadge('arachnos-rising')?.getRequirement('arac-1')?.location?.[0]
  },
}

export const Pedestal = {
  args: {
    location: content.getBadge('arachnos-rising')?.getRequirement('arac-2')?.location?.[0]
  },
}

export const Object = {
  args: {
    location: content.getBadge('midnighter-archivist')?.getRequirement('midn-0')?.location?.[0]
  },
}

export const Empty = {
  args: {
    location: undefined
  },
}
