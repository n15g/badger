// noinspection JSUnusedGlobalSymbols

import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import BadgeCard from './BadgeCard.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { STORYBOOK_CONTENT, TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'
import { expect, waitFor } from 'storybook/test'
import CharacterContextProvider from '../character/CharacterContextProvider.tsx'
import BadgeCount from '../character/BadgeCount.tsx'
import { getStorybookDb } from '../../../.storybook/storybook-db.ts'

const meta: Meta<typeof BadgeCard> = {
  title: 'badge/BadgeCard',
  component: BadgeCard,
  parameters: storyParameters({ characters: TEST_CHARACTERS }),
}
export default meta
type StoryType = StoryObj<typeof BadgeCard>

export const Exploration: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hangman')
  },
}

export const Collect_For_Character: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({ characters: TEST_CHARACTERS, characterKey: 'test1' }),
  args: { badge: STORYBOOK_CONTENT.getBadge('hangman') },
  render: function Render(args) {
    const { character } = CharacterContextProvider.useCharacterContext()
    return <>
      {character && <BadgeCount character={character}/>}
      <BadgeCard {...args}/>
    </>
  },
  play: async ({ canvas, userEvent, loaded }) => {
    const complete = await canvas.findByRole('switch')
    await expect(complete).not.toBeChecked()
    await expect(canvas.getByText('0 badges')).toBeVisible()
    await userEvent.click(complete)
    await waitFor(() => expect(complete).toBeChecked())
    await expect(await canvas.findByText('1 badge')).toBeVisible()
    const db = getStorybookDb(loaded)
    await expect((await db.getCharacter('test1'))?.badges?.hangman?.owned).toBe(true)
    await userEvent.click(complete)
    await waitFor(() => expect(complete).not.toBeChecked())
    await expect(await canvas.findByText('0 badges')).toBeVisible()
    await expect((await db.getCharacter('test1'))?.badges?.hangman?.owned).toBe(false)
    await expect((await db.getCharacter('test2'))?.badges).toBeUndefined()
  },
}

export const Collect_Without_Awarding_Dependents: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({ characters: TEST_CHARACTERS, characterKey: 'test1' }),
  args: { badge: STORYBOOK_CONTENT.getBadge('defender-of-truth') },
  render: Collect_For_Character.render,
  play: async ({ canvas, userEvent, loaded }) => {
    const complete = await canvas.findByRole('switch')
    await userEvent.click(complete)
    await waitFor(() => expect(complete).toBeChecked())
    // Level 30 is a prerequisite for two alignment-specific gladiator badges.
    // Only the explicitly selected badge should be collected.
    const db = getStorybookDb(loaded)
    await expect((await db.getCharacter('test1'))?.badges).toEqual({
      'defender-of-truth': { owned: true },
    })
    await expect(canvas.getByText('1 badge')).toBeVisible()
  },
}

export const Uncollect_Without_Removing_Dependents: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({
    characters: [{
      key: 'test1', name: 'Previously collected badges', morality: 'rogue',
      badges: {
        'defender-of-truth': { owned: true },
        'night-widow': { owned: true },
        'fire-thorn-caster': { owned: true },
      },
    }],
    characterKey: 'test1',
  }),
  args: { badge: STORYBOOK_CONTENT.getBadge('defender-of-truth') },
  render: Collect_For_Character.render,
  play: async ({ canvas, userEvent, loaded }) => {
    const complete = await canvas.findByRole('switch')
    await expect(complete).toBeChecked()
    await userEvent.click(complete)
    await waitFor(() => expect(complete).not.toBeChecked())
    const db = getStorybookDb(loaded)
    await expect((await db.getCharacter('test1'))?.badges).toEqual({
      'defender-of-truth': { owned: false },
      'night-widow': { owned: true },
      'fire-thorn-caster': { owned: true },
    })
    await expect(canvas.getByText('2 badges')).toBeVisible()
  },
}

export const Complete_Requirements_Then_Collect: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({ characters: TEST_CHARACTERS, characterKey: 'test1' }),
  args: { badge: STORYBOOK_CONTENT.getBadge('hangman') },
  render: Collect_For_Character.render,
  play: async ({ canvas, userEvent, loaded }) => {
    const requirement = await canvas.findByRole('checkbox')
    const complete = canvas.getByRole('switch')
    await userEvent.click(requirement)
    await waitFor(() => expect(requirement).toBeChecked())
    await expect(canvas.getByText('Progress 100% (1 / 1)')).toBeVisible()
    await expect(complete).not.toBeChecked()
    await expect(canvas.getByText('0 badges')).toBeVisible()
    const db = getStorybookDb(loaded)
    await expect((await db.getCharacter('test1'))?.badges?.hangman).toMatchObject({
      req: { 'loc-0': { owned: true } },
    })
    await expect((await db.getCharacter('test1'))?.badges?.hangman?.owned ?? false).toBe(false)

    await userEvent.click(complete)
    await waitFor(() => expect(complete).toBeChecked())
    await expect(canvas.getByText('1 badge')).toBeVisible()
    await userEvent.click(complete)
    await waitFor(() => expect(complete).not.toBeChecked())
    await expect(requirement).toBeChecked()
    await expect((await db.getCharacter('test1'))?.badges?.hangman).toMatchObject({
      owned: false, req: { 'loc-0': { owned: true } },
    })
  },
}

export const Count_Requirements_Independently: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({
    characters: [{
      key: 'test1', name: 'Crafting progress',
      badges: { decaying: { req: { a: { owned: true, count: 1 }, c: { owned: true } } } },
    }],
    characterKey: 'test1',
  }),
  args: { badge: STORYBOOK_CONTENT.getBadge('decaying') },
  play: async ({ canvas, userEvent, loaded }) => {
    const counts = await canvas.findAllByRole('spinbutton')
    const complete = canvas.getByRole('switch')
    await userEvent.clear(counts[1])
    await userEvent.type(counts[1], '1')
    await expect(await canvas.findByText('Progress 100% (3 / 3)')).toBeVisible()
    await expect(complete).not.toBeChecked()
    const db = getStorybookDb(loaded)
    await expect((await db.getCharacter('test1'))?.badges?.decaying?.req?.b).toEqual({ owned: true, count: 1 })
    await expect((await db.getCharacter('test1'))?.badges?.decaying?.owned ?? false).toBe(false)

    await userEvent.click(complete)
    await waitFor(() => expect(complete).toBeChecked())
    await userEvent.clear(counts[1])
    await waitFor(async () => {
      await expect((await db.getCharacter('test1'))?.badges?.decaying).toMatchObject({
        owned: true, req: { b: { owned: false, count: 0 } },
      })
    })
    await expect(complete).toBeChecked()
  },
}

export const Badge_Requirement_Collects_Only_Selected_Badge: StoryType = {
  tags: ['interaction'],
  parameters: storyParameters({ characters: TEST_CHARACTERS, characterKey: 'test1' }),
  args: { badge: STORYBOOK_CONTENT.getBadge('night-widow') },
  play: async ({ canvas, userEvent, loaded }) => {
    const requirement = await canvas.findByRole('checkbox')
    const complete = canvas.getByRole('switch')
    await userEvent.click(requirement)
    await waitFor(() => expect(requirement).toBeEnabled())
    await expect(requirement).toBeChecked()
    await expect(canvas.getByText('Progress 100% (1 / 1)')).toBeVisible()
    await expect(complete).not.toBeChecked()
    const db = getStorybookDb(loaded)
    const character = await db.getCharacter('test1')
    await expect(character?.badges?.['defender-of-truth']?.owned).toBe(true)
    await expect(character?.badges?.['night-widow']?.owned ?? false).toBe(false)
    await expect(character?.badges?.['fire-thorn-caster']).toBeUndefined()

    await userEvent.click(complete)
    await waitFor(() => expect(complete).toBeChecked())
    await userEvent.click(requirement)
    await waitFor(() => expect(requirement).toBeEnabled())
    await expect(requirement).not.toBeChecked()
    await expect(complete).toBeChecked()
    await expect((await db.getCharacter('test1'))?.badges).toMatchObject({
      'defender-of-truth': { owned: false },
      'night-widow': { owned: true, req: { 'defender-of-truth': { owned: false } } },
    })
  },
}

export const Multi_Location: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('urban-spelunker')
  },
}

export const Accolade: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('received-the-atlas-medallion')
  },
}

export const History: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('patron-of-the-arts')
  },
}

export const With_Acquisition: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('generational-trauma'),
  },
}

export const Multiple_BadgeText: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('hero-of-the-city'),
  },
}

export const With_Effect: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('gold-standard'),
  },
}

export const Invention: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('decaying'),
  },
}

export const Not_Counted_In_Totals: StoryType = {
  args: {
    badge: STORYBOOK_CONTENT.getBadge('bug-hunter'),
  },
}
