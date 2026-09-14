// noinspection JSUnusedGlobalSymbols

import type { Preview } from '@storybook/react-vite'
import { useDarkMode } from '@vueless/storybook-dark-mode'
import '../src/app/global.css'
import StorybookProviders from './StorybookProviders.tsx'
import { createStorybookDb, getStorybookDb } from './storybook-db.ts'
import { getStorybookScenario } from './storybook-scenario.ts'

const preview: Preview = {
  async beforeEach({ parameters, loaded }) {
    const scenario = getStorybookScenario(parameters)
    if (scenario.characters === undefined) return
    const { db, cleanup } = await createStorybookDb(scenario.characters)
    loaded.badgerDb = db
    return cleanup
  },
  parameters: {
    layout: 'centered',
    options: { storySort: { method: 'alphabetical' } },
  },
  decorators: [
    (Story, { id, parameters, loaded }) => {
      const scenario = getStorybookScenario(parameters)
      return (
        <StorybookProviders key={id}
                            scenario={scenario}
                            db={scenario.characters === undefined ? undefined : getStorybookDb(loaded)}
                            mode={useDarkMode() ? 'dark' : 'light'}>
          <Story/>
        </StorybookProviders>
      )
    },
  ],
}

export default preview
