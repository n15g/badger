// noinspection JSUnusedGlobalSymbols

import LocationInfo from './LocationInfo.tsx'
import { Location } from 'coh-content-db'

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

export const Empty = {
  args: {
    location: undefined
  },
}
