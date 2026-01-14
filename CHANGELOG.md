# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-01-14

### Fixed

- [#54](https://github.com/n15g/badger/issues/54) - Links in badge tooltip are broken
- [#55](https://github.com/n15g/badger/issues/55) - Settitle script was missing badges

## [2.1.0] - 2026-01-14

### Added

- [#50](https://github.com/n15g/badger/pull/50) - Character import and export, and log parser.
- [#51](https://github.com/n15g/badger/pull/51) - Polyfills for pre-2023 browser support.
- [#53](https://github.com/n15g/badger/pull/53) - Collect multiple badges simultaneously from the badge list.

### Changed

- [#52](https://github.com/n15g/badger/issues/52) - Badge character list now links to the clicked character's badge page.

### Security

- Bumped `react-router` version due to reported vulnerabilities < 7.12.0.

----

## [2.0.7] - 2026-01-08

### Added

- [#49](https://github.com/n15g/badger/pull/49) - Show characters that have a badge on the badge view.

----

## [2.0.6] - 2026-01-05

### Added

- Contact, Mission and Zone data.
- Tooltips when hovering over Badges, Contacts, Missions and Zones.
- Sort Badges by release date.
- Copy /settitle and /thumbtack commands to the clipboard.

### Changed

- Updated to the [coh-content-db:2.0.0](https://github.com/n15g/coh-content-db) data model.
- Rebuilt the application using React instead of Angular.

### Removed

- Server group management - The app is specifically designed for Homecoming now.
