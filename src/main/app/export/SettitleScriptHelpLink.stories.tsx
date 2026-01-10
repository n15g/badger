// noinspection JSUnusedGlobalSymbols

import SettitleScriptHelpLink from './SettitleScriptHelpLink.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof SettitleScriptHelpLink> = {
  title: 'export/SettitleScriptHelpLink',
  component: SettitleScriptHelpLink
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Test: StoryType = {}
