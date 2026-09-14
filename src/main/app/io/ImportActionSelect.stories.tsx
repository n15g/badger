// noinspection JSUnusedGlobalSymbols

import ImportActionSelect from './ImportActionSelect.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, within } from 'storybook/test'
import { useState } from 'react'
import { ImportAction } from './import-action.ts'

const meta: Meta<typeof ImportActionSelect> = {
  title: 'io/ImportActionSelect',
  component: ImportActionSelect,
}
export default meta
type StoryType = StoryObj<typeof ImportActionSelect>

export const With_Selected: StoryType = {
  args: {
    value: 'merge',
  },
}

export const Change_Action: StoryType = {
  tags: ['interaction'],
  args: { value: 'merge', onNewValue: fn(), 'aria-label': 'Import action' },
  render: function Render(args) {
    const [value, setValue] = useState<ImportAction>(args.value)
    return <ImportActionSelect {...args} value={value} onNewValue={next => {
      setValue(next)
      args.onNewValue?.(next)
    }}/>
  },
  play: async ({ canvas, canvasElement, userEvent, args }) => {
    const select = await canvas.findByRole('combobox', { name: 'Import action' })
    await expect(select).toHaveTextContent('Merge')
    await userEvent.click(select)
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(await page.findByRole('option', { name: 'Ignore' }))
    await expect(select).toHaveTextContent('Ignore')
    await expect(args.onNewValue).toHaveBeenCalledWith('ignore')
    // Joy's select supports native keyboard navigation through the same options.
    await userEvent.click(select)
    await userEvent.keyboard('{Home}{Enter}')
    await expect(select).toHaveTextContent('New')
    await expect(args.onNewValue).toHaveBeenLastCalledWith('new')
  },
}
