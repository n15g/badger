// noinspection JSUnusedGlobalSymbols

import CharacterCard from './CharacterCard.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { useLocation } from 'react-router'
import { storyParameters } from '../../../.storybook/storybook-scenario.ts'

const meta: Meta<typeof CharacterCard> = {
  title: 'character/CharacterCard',
  component: CharacterCard,
}
export default meta
type StoryType = StoryObj<typeof CharacterCard>

export const Default: StoryType = {
  args: {
    character: { key: 'test', name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
}

export const Long_Name: StoryType = {
  args: {
    character: { key: 'test', name: 'This is a really long character name', archetypeKey: 'blaster', server: 'Torchbearer' }
  },
}

export const Unknown_Archetype: StoryType = {
  args: {
    character: { key: 'test', name: 'This is a really long character name', archetypeKey: undefined, server: 'Torchbearer' }
  },
}

export const Navigation: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({ initialRoute: '/characters?sort=name' }),
  args: { character: { key: 'test', name: 'Test', server: 'Torchbearer' } },
  render: function Render(args) {
    const { pathname, search } = useLocation()
    return <>
      <CharacterCard {...args}/>
      <output aria-label="Current route">{pathname}{search}</output>
    </>
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const previewUrl = canvasElement.ownerDocument.location.href
    await expect(canvas.getByRole('status', { name: 'Current route' })).toHaveTextContent('/characters?sort=name')
    await userEvent.click(canvas.getByRole('link', { name: /Test/ }))
    await expect(await canvas.findByText('/characters/test')).toBeVisible()
    await expect(canvasElement.ownerDocument.location.href).toBe(previewUrl)
  },
}
