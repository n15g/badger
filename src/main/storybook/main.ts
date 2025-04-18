// noinspection JSUnusedGlobalSymbols

import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-viewport',
    '@storybook/addon-viewport',
  ],
  framework: {
    'name': '@storybook/react-vite',
    'options': {}
  },
}

export default config
