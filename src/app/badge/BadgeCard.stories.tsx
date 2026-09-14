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
