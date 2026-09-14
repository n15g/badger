// noinspection JSUnusedGlobalSymbols

import LinksBlock from './LinksBlock.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof LinksBlock> = {
  title: 'util/LinksBlock',
  component: LinksBlock,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Many: StoryType = {
  args: {
    links: [
      {
        title: '(Wilma Peterson) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Wilma_Peterson#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
      {
        title: '(Andrew Fiore) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Andrew_Fiore#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
      {
        title: '(Claire Childress) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Claire_Childress#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
      {
        title: '(Lt. Col. Hugh McDougal) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Lt._Col._Hugh_McDougal#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
      {
        title: '(Jake Kim) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Jake_Kim#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
      {
        title: '(Vic Garland) Retrieve the stolen weapons from the Freakshow',
        href: 'https://homecoming.wiki/wiki/Vic_Garland#Retrieve_the_stolen_weapons_from_the_Freakshow_(20-24)'
      },
    ]
  },
}

export const None: StoryType = {
  args: {
    links: []
  }
}
