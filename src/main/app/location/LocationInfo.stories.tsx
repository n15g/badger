// noinspection JSUnusedGlobalSymbols

import LocationInfo from './LocationInfo.tsx'
import { Location } from 'coh-content-db'
import { STORYBOOK_CONTENT } from '../../storybook/storybook-content.ts'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof LocationInfo> = {
  title: 'location/LocationInfo',
  component: LocationInfo,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

const content = STORYBOOK_CONTENT

export const All: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'badge', iconText: '2' })
  },
}

export const Very_Long: StoryType = {
  args: {
    location: new Location({
      zoneKey: 'architect-entertainment-buildings',
      coords: [9999.9, -9999.9, 9999.9],
      icon: 'badge',
      iconText: 'X'
    })
  },
}

export const Just_Zone: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park' })
  },
}

export const Just_Coords: StoryType = {
  args: {
    location: new Location({ coords: [1, -2, 3.5] })
  },
}

export const Badge: StoryType = {
  args: {
    location: content.getBadge('asunder')?.getRequirement('loc-0')?.location?.[0]
  },
}

export const Plaque: StoryType = {
  args: {
    location: content.getBadge('arachnos-rising')?.getRequirement('arac-1')?.location?.[0]
  },
}

export const Pedestal: StoryType = {
  args: {
    location: content.getBadge('arachnos-rising')?.getRequirement('arac-2')?.location?.[0]
  },
}

export const Object: StoryType = {
  args: {
    location: content.getBadge('midnighter-archivist')?.getRequirement('midn-0')?.location?.[0]
  },
}

export const Empty: StoryType = {
  args: {
    location: undefined
  },
}
