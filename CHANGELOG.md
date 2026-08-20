# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added explicit audit, type-check, application build, Storybook build, and aggregate validation commands.
- Added pull-request validation and downloadable CI build artifacts.

### Fixed

- Excluded generated application and Storybook bundles from lint validation.

### Security

- Updated application and build dependencies to resolve reported vulnerabilities in React Router, Nano ID, PostCSS, and brace expansion.
- Reduced GitHub Actions permissions to the minimum required by each job and pinned actions to immutable commits.

### Changed

- Standardized development and builds on Node.js 24 and npm 12.
- Updated to `coh-content-db` and `coh-content-db-homecoming` 2.3.0.
- Removed the obsolete esbuild dependency override.
- Switched CI and release installs from `npm install` to reproducible `npm ci` installs.
- Changed prerelease tags to retain build artifacts without deploying over the stable GitHub Pages site.

---

## [2.3.3] - 2026-04-28

### Changed

- Added "Badges" to the Homecoming changelog link so that it doesn't look like a link to the Homecoming server changelog.

## [2.3.2] - 2026-04-28

### Fixed

- Standardized location link order with other links.

## [2.3.1] - 2026-03-28

### Fixed

- Build import is no longer case-sensitive.

## [2.3.0] - 2026-03-28

### Added

- Characters can now be imported from `/build_save` exports ([#62](https://github.com/n15g/badger/issues/62)).
- Support for game IDs in badge data ([#62](https://github.com/n15g/badger/issues/62)).
- Added a settings page with the option to change where the game data is fetched from ([#70](https://github.com/n15g/badger/issues/70)).

---

## [2.2.3] - 2026-03-13

### Fixed

- Fixed incorrectly muted icons on the global badge list.

## [2.2.2] - 2026-03-13

### Added

- Update related badges when a badge is collected, such as accolades that require that badge ([#60](https://github.com/n15g/badger/issues/60)).
- Added a progress indicator to the badge list and badge view for badges that have multiple requirements ([#60](https://github.com/n15g/badger/issues/60)).

### Changed

- Switched from a brightness filter to opacity for a better appearance of muted elements in light mode ([#60](https://github.com/n15g/badger/issues/60)).
- Links from the badge view to a character's badge list now show the badge-list tab correctly ([#60](https://github.com/n15g/badger/issues/60)).

## [2.2.1] - 2026-01-27

### Changed

- Display invention-count requirements on the badge list ([#59](https://github.com/n15g/badger/issues/59)).

## [2.2.0] - 2026-01-20

### Added

- Sort the character list by server.
- Added character origins to improve Praetorian badge variant display ([#58](https://github.com/n15g/badger/issues/58)).

---

## [2.1.3] - 2026-01-19

### Fixed

- Fixed the character-import modal not scrolling ([#57](https://github.com/n15g/badger/issues/57)).

## [2.1.2] - 2026-01-15

### Fixed

- Fixed imported character data not being merged ([#56](https://github.com/n15g/badger/issues/56)).

## [2.1.1] - 2026-01-14

- No user-facing changes were documented for this release.

## [2.1.0] - 2026-01-14

### Fixed

- Fixed broken links in badge tooltips ([#54](https://github.com/n15g/badger/issues/54)).
- Fixed badges missing from the set-title script ([#55](https://github.com/n15g/badger/issues/55)).

### Added

- Character import and export, and a log parser ([#50](https://github.com/n15g/badger/pull/50)).
- Polyfills for pre-2023 browser support ([#51](https://github.com/n15g/badger/pull/51)).
- Collect multiple badges simultaneously from the badge list ([#53](https://github.com/n15g/badger/pull/53)).

### Changed

- The badge character list now links to the clicked character's badge page ([#52](https://github.com/n15g/badger/issues/52)).

### Security

- Bumped `react-router` due to reported vulnerabilities in versions before 7.12.0.

---

## [2.0.7] - 2026-01-08

### Added

- Show characters that have a badge on the badge view ([#49](https://github.com/n15g/badger/pull/49)).

## [2.0.6] - 2026-01-06

### Added

- Contact, mission, and zone data.
- Tooltips when hovering over badges, contacts, missions, and zones.
- Sort badges by release date.
- Copy `/settitle` and `/thumbtack` commands to the clipboard.

### Changed

- Updated to the [coh-content-db 2.0.0](https://github.com/n15g/coh-content-db) data model.
- Rebuilt the application using React instead of Angular.

### Removed

- Server group management; the app is now specifically designed for Homecoming.
