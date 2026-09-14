// noinspection JSUnusedGlobalSymbols

import EditCharacterForm from './EditCharacterForm.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, waitFor, within } from 'storybook/test'

const meta: Meta<typeof EditCharacterForm> = {
  title: 'character/EditCharacterForm',
  component: EditCharacterForm,
}
export default meta
type StoryType = StoryObj<typeof EditCharacterForm>

export const New: StoryType = {
  tags: ['interaction'],
  args: {
    character: undefined,
    onSave: fn().mockResolvedValue(undefined),
  },
  play: async ({ canvas, canvasElement, userEvent, args }) => {
    const save = await canvas.findByRole('button', { name: 'Save' })
    await expect(save).toBeDisabled()
    await userEvent.type(canvas.getByRole('textbox', { name: /Name/ }), 'New Hero')
    await expect(save).toBeDisabled()
    await userEvent.click(canvas.getByRole('combobox', { name: /Server/ }))
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(await page.findByRole('option', { name: 'Torchbearer' }))
    await expect(save).toBeEnabled()
    await userEvent.click(save)
    await waitFor(() => expect(args.onSave).toHaveBeenCalledWith({
      name: 'New Hero', server: 'Torchbearer', origin: 'primal',
      archetypeKey: 'blaster', morality: 'hero', sex: 'M',
    }))
  },
}

export const Existing: StoryType = {
  tags: ['interaction'],
  args: {
    character: { name: 'Test', archetypeKey: 'blaster', server: 'Torchbearer', morality: 'rogue', sex: 'F' },
    onSave: fn().mockResolvedValue(undefined),
  },
  play: async ({ canvas, userEvent, args }) => {
    const name = await canvas.findByRole('textbox', { name: /Name/ })
    await expect(name).toHaveValue('Test')
    await expect(canvas.getByRole('radio', { name: 'Female' })).toBeChecked()
    await userEvent.clear(name)
    await expect(canvas.getByRole('button', { name: 'Save' })).toBeDisabled()
    await userEvent.type(name, 'Renamed')
    await userEvent.click(canvas.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(args.onSave).toHaveBeenCalledWith({
      name: 'Renamed', server: 'Torchbearer', origin: 'primal',
      archetypeKey: 'blaster', morality: 'rogue', sex: 'F',
    }))
  },
}

export const Existing_Minimum: StoryType = {
  args: {
    character: { name: 'Test' }
  },
}
