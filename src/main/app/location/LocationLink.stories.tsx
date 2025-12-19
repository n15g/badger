// noinspection JSUnusedGlobalSymbols

import LocationLink from './LocationLink.tsx'
import { Location } from 'coh-content-db'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof LocationLink> = {
  title: 'location/LocationLink',
  component: LocationLink,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

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
    location: new Location({ zoneKey: 'rikti-war-zone' })
  },
}

export const Just_Coords: StoryType = {
  args: {
    location: new Location({ coords: [1, -2, 3.5] })
  },
}

export const No_Icon_Text: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'pedestal' })
  },
}

export const Badge: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'badge', iconText: '1' })
  },
}

export const Plaque: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'plaque', iconText: '2' })
  },
}

export const Pedestal: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'pedestal', iconText: 'X' })
  },
}

export const Object: StoryType = {
  args: {
    location: new Location({ zoneKey: 'atlas-park', coords: [1, -2, 3.5], icon: 'object' })
  },
}
