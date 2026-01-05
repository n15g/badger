// noinspection JSUnusedGlobalSymbols

import RequirementListItem from './RequirementListItem.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof RequirementListItem> = {
  title: 'badge/RequirementListItem',
  component: RequirementListItem,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Task: StoryType = {
  args: {
    requirement: { key: '', type: 'task', notes: 'This is a *note* example in [atlas-park](zone://atlas-park).', links: [] }
  },
}

export const Badge: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'badge',
      badgeKey: 'hangman',
      links: []
    }
  },
}

export const Badge_With_All: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'badge',
      badgeKey: 'hangman',
      notes: 'This is a *note* example in [atlas-park](zone://atlas-park).',
      links: [
        { title: 'Badge Link', href: 'badge://abomination' },
        { title: 'Homecoming Wiki', href: 'https://homecoming.wiki/Test' }
      ]
    }
  },
}

export const Mission: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'mission',
      missionKey: 'abandoned-sewers-trial',
      links: []
    }
  },
}

export const Mission_With_All: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'mission',
      missionKey: 'abandoned-sewers-trial',
      notes: 'This is a *note* example in [atlas-park](zone://atlas-park).',
      links: [
        { title: 'Badge Link', href: 'badge://abomination' },
        { title: 'Homecoming Wiki', href: 'https://homecoming.wiki/Test' }
      ]
    }
  },
}

export const Location: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'location',
      location: [
        { zoneKey: 'kallisti-wharf', coords: [7356, 77.7, 527.5], icon: 'plaque', iconText: '2' },
      ],
      links: []
    }
  },
}

export const Multiple_Location: StoryType = {
  args: {
    requirement: {
      key: '',
      type: 'location',
      location: [
        { zoneKey: 'kallisti-wharf', coords: [7356, 77.7, 527.5], icon: 'plaque', iconText: '2' },
        { zoneKey: 'atlas-park', coords: [7356, 77.7, 527.5], icon: 'plaque', iconText: '2' },
        { zoneKey: 'kings-row', coords: [7356, 77.7, 527.5], icon: 'plaque', iconText: '2' },
        { zoneKey: 'architect-entertainment-buildings', coords: [7356, 77.7, 527.5], icon: 'plaque', iconText: '2' },
      ],
      links: []
    }
  },
}

export const Monument: StoryType = {
  args: {
    requirement: {
      key: 'patr-0',
      type: 'monument',
      location: [{ zoneKey: 'kallisti-wharf', coords: [1997.9, 47.5, 423], icon: 'plaque', iconText: '20' }],
      monumentText: `Theatre Row was a place of fashion and culture for decades. It truly rose to fame in the 1910s and 1920s when Kallisti Wharf was booming with trade, shipping, and immigration.
It was renowned for its unique street food, art festivals, and numerous theaters, quickly developing into a major tourist trap.
By the late 1930s the Paragon Showcase sprang up, a rival film festival to the nascent Cannes and Venice Film Festivals.`,
      links: []
    },
  }
}

export const Monument_With_All: StoryType = {
  args: {
    requirement: {
      key: 'patr-0',
      type: 'monument',
      location: [{ zoneKey: 'kallisti-wharf', coords: [1997.9, 47.5, 423], icon: 'plaque', iconText: '20' }],
      monumentText: `Theatre Row was a place of fashion and culture for decades. It truly rose to fame in the 1910s and 1920s when Kallisti Wharf was booming with trade, shipping, and immigration.
It was renowned for its unique street food, art festivals, and numerous theaters, quickly developing into a major tourist trap.
By the late 1930s the Paragon Showcase sprang up, a rival film festival to the nascent Cannes and Venice Film Festivals.`,
      notes: 'This is a *note* example in [atlas-park](zone://atlas-park).',
      links: [
        { title: 'Badge Link', href: 'badge://abomination' },
        { title: 'Homecoming Wiki', href: 'https://homecoming.wiki/Test' }
      ]
    },
  }
}

export const Invention: StoryType = {
  args: {
    requirement: {
      key: 'a',
      type: 'invention',
      inventionLevel: 15,
      inventionTypes: ['defense-debuff', 'to-hit-debuff', 'taunt', 'confuse'],
      count: 1,
      links: []
    },
  }
}

export const Invention_Plus_One: StoryType = {
  args: {
    requirement: {
      key: 'a',
      type: 'invention-plus-one',
      links: []
    },
  }
}
