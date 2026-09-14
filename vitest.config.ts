import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
          clearMocks: true,
          restoreMocks: true,
        },
      },
      {
        plugins: [storybookTest({
          storybookScript: 'npm run storybook -- --no-open',
        })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            screenshotFailures: true,
            screenshotDirectory: 'test-results/screenshots',
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
