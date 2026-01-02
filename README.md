# Badger

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/n15g/badger/build.yml?branch=master)](https://github.com/n15g/badger/actions)
[![GitHub Tag](https://img.shields.io/github/v/tag/n15g/badger)](https://github.com/n15g/badger/tags)
[![GitHub License](https://img.shields.io/github/license/n15g/badger)](LICENSE)

Badger is a badge tracking application for the City of Heroes [Homecoming](https://homecomingservers.com/) servers.

Badger runs directly in your browser, no need to download anything: https://n15g.github.io/badger/

Go hunt. Kill Skuls.

----

# Changelog

[CHANGELOG.md](CHANGELOG.md)

----

# Development

If you'd like to run the app locally for development purposes, here's what you'll need:

### Modifying the badges and other data

This repository just contains the code for the Badger App.

The badge data for Homecoming is maintained in the [coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming) project.
See the README file in that repository for details on how to modify badge content.

### Requirements

* [Node JS 22+](https://nodejs.org/)
* [git SCM](https://git-scm.com/)

### Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm install`
3. Launch the development server `npm run dev`
4. Launch storybook `npm run storybook`

The app will now be accessible at http://localhost:5173 and storybook at http://localhost:6006.
Most changes will be reflected automatically without needing to restart the server.

----

# Release

1. Determine the next [Semantic Release](https://semver.org) version, i.e. `2.0.0-rc.16`
2. Update the version and release notes in the [CHANGELOG.md](CHANGELOG.md).
    * Commit with the comment `Changelog <semver>`
3. `npm version <semver>` - Updates the package.json and commits + tags new version. Use semver syntax for version number.
4. `npm run push` - Push the commit and tags to remote.
5. GitHub will release automatically.

Tags matching the pattern `v<X>.<Y>.<Z>` will attempt to publish to npm (this can only be achieved by the package manager (n15g).
The `npm version` command automatically prepends the `v` prefix to the version number.
