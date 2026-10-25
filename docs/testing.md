# Testing

Follow [Development](development.md) to set up the project and
[Contributing: Validation](../CONTRIBUTING.md#validation) for the required checks before review.

## Commands

Run `npm run test:install` once after installing dependencies, and again when Playwright is updated, to install Chromium.
On Linux CI, use `npm run test:install -- --with-deps` to also install browser system dependencies.

| Command                        | Purpose                                                                    |
|--------------------------------|----------------------------------------------------------------------------|
| `npm test`                     | Run logic tests, all story render checks, and interaction tests once       |
| `npm run test:unit`            | Run logic and persistence tests in Node; no browser required               |
| `npm run test:ui`              | Render every Storybook story and run its interactions in headless Chromium |
| `npm run test:storybook-build` | Smoke-test the existing Storybook build in Chromium                        |
| `npm run test:watch`           | Watch and rerun affected tests                                             |
| `npm run validate`             | Run lint, tests, type-checking, and application/Storybook builds           |

Vitest runs two projects: `unit` discovers `*.test.ts` files under `src/` and `test/`, and `storybook` renders every story and runs any `play` function.
For example, `npm run test:unit -- character.test.ts` runs one test file, and
`npm run test:watch -- --project=storybook` watches browser tests only.
The Storybook Vitest addon also runs and debugs interaction tests from the Storybook UI.

Keep most assertions in ordinary TypeScript tests around domain behavior and external boundaries.
The initial examples cover character defaults and merging, import planning, build/chat parsing, plain and gzip exports,
and IndexedDB persistence. Parser fixtures in `test/support` contain small, explicit content bundles;
they do not depend on a remote content server. Persistence tests use `fake-indexeddb` with the real database implementation.

For UI behavior, add a `play` function. Use `tags: ['interaction']` to identify stories with interaction assertions;
the tag is descriptive and is not required for test discovery.
Use roles, accessible names, user interactions, and observable outcomes rather than DOM snapshots or CSS selectors.
Await rendering and state changes instead of adding fixed delays. Existing examples cover form validation and saving,
import action selection, badge totals, and badge collection through the real providers.
Stories without a `play` function receive a render smoke test automatically. This catches rendering failures;
it does not verify visual appearance or interactions that have no assertions.

## Storybook providers and fixtures

`StorybookProviders` supplies the theme, error notifications, content, and a memory router in one
explicit provider tree. Every Joy UI wrapper is inside the theme. Routing starts at `/` and stays
inside the story, without changing Storybook's URL. Keep dependent providers in this component;
use component decorators for independent presentation, such as displaying inline text in a sentence.

Display stories use component `args` and do not open IndexedDB. Connected stories opt into real
character providers and persistence with the typed `storyParameters` helper, at component or story level:

```tsx
import { storyParameters } from '../../../.storybook/storybook-scenario.ts'
import { TEST_CHARACTERS } from '../../../.storybook/storybook-content.ts'

// Inside the component's metadata or an individual story:
parameters: storyParameters({
    characters: TEST_CHARACTERS,
    characterKey: 'test1',
    initialRoute: '/characters/test1',
    width: 'wide',
})
```

Only `characters` is needed to enable persistence; `characters: []` creates an empty database.
Omitting it leaves persistence disabled. The selected character, initial route, and wide Card wrapper
are optional. Duplicate fixture keys and unknown selected character keys fail during setup. Use
fixtures matching the records that a story edits; the selected character updates when its stored record changes.
Storybook merges component and story parameters. Keep persistence at individual-story level when
only some variants need it; use component metadata when every variant needs character providers.

Each connected story owns a temporary database, passed directly to `BadgerDbProvider` and deleted
on cleanup. Play functions can use `getStorybookDb(loaded)` to verify persisted results. There are
no database module mocks; the app still opens its normal database when no instance is supplied.
Storybook edits are temporary and do not use the application's saved characters. The global router
is declarative; if a story needs loaders or actions, extend the harness with a memory data-router
mode instead of nesting another router inside it.

## Built Storybook checks

`npm run storybook:build` also smoke-tests the generated site in Chromium. This checks Storybook's
own runtime, which can behave differently from the Vitest runner, and requires `npm run test:install` first.

Keep `vitest` and `@vitest/browser-playwright` on matching versions compatible with the Storybook
Vitest addon's peer dependencies. Upgrade the Storybook package family together.
Both pull-request and release workflows run the tests before producing deployable artifacts.
Failed browser assertions save screenshots under `test-results/`; CI uploads them as a downloadable artifact.
