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

If you'd like to run the app locally for development purposes, here's what you'll need:

### Modifying the badges and other data

This repository just contains the code for the Badger App.

The badge data for Homecoming is maintained in the [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming) project.
See the README file in that repository for details on how to modify badge content.

### Requirements

* [Node JS 24+](https://nodejs.org/)
* [git SCM](https://git-scm.com/)

### Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm ci`
3. Launch the development server `npm run dev`
4. Launch storybook `npm run storybook`

The app will now be accessible at http://localhost:5173 and storybook at http://localhost:6006.
Most changes will be reflected automatically without needing to restart the server.

### Checking dependencies

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to check for package updates:

1. `npx npm-check-updates`
2. `npx npm-check-updates -u`
3. `npm install`

----

# Release

1. Determine the next [Semantic Version](https://semver.org), such as `2.4.0` or `2.4.0-rc.1`.
2. Move the release notes from `Unreleased` into a versioned section in [CHANGELOG.md](CHANGELOG.md), then commit them.
3. Run `npm run validate` and `npm run audit`.
4. Run `npm version <version>` to update `package.json` and `package-lock.json`, create the version commit, and add the corresponding `v`-prefixed tag.
5. Run `npm run push` to push the commit and tags.

Every matching tag is validated and produces a downloadable application artifact. Stable tags such as `v2.4.0` deploy that artifact to GitHub Pages; prerelease tags such as `v2.4.0-rc.1` do not replace the production site. Badger is a private application package and is not published to npm.
