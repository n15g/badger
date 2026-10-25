# Development

See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution, validation, and PR guidelines,
and [AGENTS.md](../AGENTS.md) for repository-specific coding-agent instructions.

## Modifying badges and game data

This repository contains the Badger application. Homecoming badge and other game data is maintained
in [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming).
See that repository's README for details on changing content. Content-model and query changes belong
in [coh-content-db](https://github.com/n15g/coh-content-db).

## Requirements

* [Node JS](https://nodejs.org/) 24.15+ on the 24.x release line, or 26+; `.nvmrc` selects Node 24.
* npm 12.0.2 (declared in `packageManager`)
* [git SCM](https://git-scm.com/)

## Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm ci`
3. Launch the development server `npm run dev`
4. Launch storybook `npm run storybook`

The app will now be accessible at http://localhost:5173 and storybook at http://localhost:6006.
Most changes will be reflected automatically without needing to restart the server.

## Repository layout

| Directory        | Contents                                                                           |
|------------------|------------------------------------------------------------------------------------|
| `src/app/`       | Application code, organized by feature, with colocated tests and component stories |
| `src/assets/`    | Images and fonts imported by the application                                       |
| `.storybook/`    | Storybook configuration, decorators, and character/content fixtures                |
| `test/fixtures/` | Sample files for import testing                                                    |
| `test/support/`  | Shared test helpers and small content fixtures                                     |
| `public/`        | Files served directly without bundling                                             |

Storybook uses its default configuration location. Type-checking and linting include `.storybook/` and `test/`.

See [Testing](testing.md) for test commands and Storybook fixtures,
[Maintenance](maintenance.md) for dependency updates, and [Releasing](releasing.md) for releases.
