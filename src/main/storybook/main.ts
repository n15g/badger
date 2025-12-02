// noinspection JSUnusedGlobalSymbols

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: [
    '../app/**/*.stories.@(ts|tsx|js|jsx)'
  ],
  addons: [
    '@vueless/storybook-dark-mode',
    'storybook-addon-remix-react-router'
  ],
  framework: {
    'name': '@storybook/react-vite',
    'options': {}
  },
}

export default config
