// noinspection JSUnusedGlobalSymbols

import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'node:path'

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|js|jsx)'
  ],
  addons: [
    '@storybook/addon-vitest',
    '@vueless/storybook-dark-mode'
  ],
  framework: {
    'name': '@storybook/react-vite',
    'options': {}
  },
  // The Vitest addon otherwise assumes the directory above Storybook is the app root.
  viteFinal: config => ({ ...config, root: resolve(import.meta.dirname, '../../..') }),
}

export default config
