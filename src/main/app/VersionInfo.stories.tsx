// noinspection JSUnusedGlobalSymbols

import VersionInfo from './VersionInfo.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof VersionInfo> = {
  title: 'app/VersionInfo',
  component: VersionInfo,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Default: StoryType = {}
