# Badger

[![CI](https://img.shields.io/github/actions/workflow/status/n15g/badger/ci.yml?branch=master&label=CI)](https://github.com/n15g/badger/actions/workflows/ci.yml)
[![GitHub Tag](https://img.shields.io/github/v/tag/n15g/badger)](https://github.com/n15g/badger/tags)
[![GitHub License](https://img.shields.io/github/license/n15g/badger)](LICENSE)

Badger is a badge tracking application for the City of Heroes [Homecoming](https://homecomingservers.com/) servers.

Badger runs directly in your browser, no need to download anything: https://n15g.github.io/badger/

Go hunt. Kill Skuls.

----

# Changelog

[CHANGELOG.md](CHANGELOG.md)

----

# Maintenance Backlog

[TODO.md](TODO.md)

----

# Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution, validation, and PR guidelines, and
[AGENTS.md](AGENTS.md) for repository-specific coding-agent instructions.

If you'd like to run the app locally for development purposes, here's what you'll need:

### Modifying the badges and other data

This repository just contains the code for the Badger App.

The badge data for Homecoming is maintained in the [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming) project.
See the README file in that repository for details on how to modify badge content.

### Requirements

* [Node JS](https://nodejs.org/) 24.15+ on the 24.x release line, or 26+; `.nvmrc` selects Node 24.
* npm 12.0.2 (declared in `packageManager`)
* [git SCM](https://git-scm.com/)

### Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm ci`
3. Launch the development server `npm run dev`
4. Launch storybook `npm run storybook`

The app will now be accessible at http://localhost:5173 and storybook at http://localhost:6006.
Most changes will be reflected automatically without needing to restart the server.

### Repository layout

| Directory | Contents |
| --- | --- |
| `src/app/` | Application code, organized by feature, with colocated tests and component stories |
| `src/assets/` | Images and fonts imported by the application |
| `.storybook/` | Storybook configuration, decorators, and character/content fixtures |
| `test/fixtures/` | Sample files for import testing |
| `test/support/` | Shared test helpers and small content fixtures |
| `public/` | Files served directly without bundling |

Storybook uses its default configuration location. Type-checking and linting include `.storybook/` and `test/`.

### Testing

Run `npm run test:install` once after installing dependencies, and again when Playwright is updated, to install Chromium.
On Linux CI, use `npm run test:install -- --with-deps` to also install browser system dependencies.

| Command | Purpose |
| --- | --- |
| `npm test` | Run Vitest logic and interaction tests once |
| `npm run test:unit` | Run logic and persistence tests in Node; no browser required |
| `npm run test:ui` | Run selected Storybook scenarios in headless Chromium |
| `npm run test:storybook-build` | Smoke-test the existing Storybook build in Chromium |
| `npm run test:watch` | Watch and rerun affected tests |
| `npm run validate` | Run lint, tests, type-checking, and application/Storybook builds |

Vitest runs two projects: `unit` discovers `*.test.ts` files under `src/` and `test/`, and `storybook` runs stories tagged `interaction`.
For example, `npm run test:unit -- character.test.ts` runs one test file, and
`npm run test:watch -- --project=storybook` watches browser tests only.
The Storybook Vitest addon also runs and debugs interaction tests from the Storybook UI.

Keep most assertions in ordinary TypeScript tests around domain behavior and external boundaries.
The initial examples cover character defaults and merging, import planning, build/chat parsing, plain and gzip exports,
and IndexedDB persistence. Parser fixtures in `test/support` contain small, explicit content bundles;
they do not depend on a remote content server. Persistence tests use `fake-indexeddb` with the real database implementation.

For UI behavior, add a `play` function and `tags: ['interaction']` to a story (or its metadata to include every story in that file).
Use roles, accessible names, user interactions, and observable outcomes rather than DOM snapshots or CSS selectors.
Await rendering and state changes instead of adding fixed delays. Existing examples cover form validation and saving,
import action selection, badge totals, and badge collection through the real providers.
Decorative stories remain available for manual inspection without automatically becoming test cases.

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

`npm run storybook:build` also smoke-tests the generated site in Chromium. This checks Storybook's
own runtime, which can behave differently from the Vitest runner, and requires `npm run test:install` first.

Vitest 4 is used because the Storybook Vitest addon currently supports Vitest 3 and 4, including in Storybook 10.6.
Keep `vitest` and `@vitest/browser-playwright` on matching versions, and check the addon's peer dependencies before a major upgrade.
Both pull-request and release workflows run the tests before producing deployable artifacts.
Failed browser assertions save screenshots under `test-results/`; CI uploads them as a downloadable artifact.

### Checking dependencies

Run `nvm install` and `nvm use` if you manage Node with nvm. npm 12 requires a supported Node patch version;
early Node 24 releases are not supported.

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to check for package updates:

1. `npx npm-check-updates`
2. `npx npm-check-updates -u`
3. `npm install`

For Storybook upgrades, run `npm run upgrade:storybook`. This runs the official upgrader and updates the Storybook
packages together. The equivalent command is:

```sh
npx storybook@latest upgrade
```

Review the upgrader's optional addon suggestions before accepting them, then run `npm run validate` and `npm run audit`.

----

# Release

1. Determine the next [Semantic Version](https://semver.org), such as `2.4.0` or `2.4.0-rc.1`.
2. Move the release notes from `Unreleased` into a versioned section in [CHANGELOG.md](CHANGELOG.md), then commit them.
3. Run `npm run validate` and `npm run audit`.
4. Run `npm version <version>` to update `package.json` and `package-lock.json`, create the version commit, and add the corresponding `v`-prefixed tag.
5. Run `npm run push` to push the commit and tags.

Every matching tag is validated and produces a downloadable application artifact. Stable tags such as `v2.4.0` deploy that artifact to GitHub Pages; prerelease tags such as `v2.4.0-rc.1` do not replace the production site. Badger is a private application package and is not published to npm.
