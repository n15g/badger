# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.1] - 2026-01-27

### Added

- [2.2.0] Sort the character list by server
- [2.2.0] [#58](https://github.com/n15g/badger/issues/58) - Added character origins to improve Praetorian badge variant display

### Changed

- [2.2.1] [#59](https://github.com/n15g/badger/issues/59) - Display invention count requirements on badge list

---

## [2.1.3] - 2026-01-19

### Fixed

- [2.1.3] [#57](https://github.com/n15g/badger/issues/57) - Character Import Modal Doesn't Scroll
- [2.1.2] [#56](https://github.com/n15g/badger/issues/56) - Import merge was doing nothing
- [2.1.0] [#54](https://github.com/n15g/badger/issues/54) - Links in badge tooltip are broken
- [2.1.0] [#55](https://github.com/n15g/badger/issues/55) - Settitle script was missing badges

### Added

- [2.1.0] [#50](https://github.com/n15g/badger/pull/50) - Character import and export, and log parser
- [2.1.0] [#51](https://github.com/n15g/badger/pull/51) - Polyfills for pre-2023 browser support
- [2.1.0] [#53](https://github.com/n15g/badger/pull/53) - Collect multiple badges simultaneously from the badge list

### Changed

- [2.1.0] [#52](https://github.com/n15g/badger/issues/52) - Badge character list now links to the clicked character's badge page

### Security

- [2.1.0] Bumped `react-router` version due to reported vulnerabilities < 7.12.0

----

## [2.0.7] - 2026-01-08

### Added

- [2.0.7] [#49](https://github.com/n15g/badger/pull/49) - Show characters that have a badge on the badge view
- [2.0.6] Contact, Mission and Zone data
- [2.0.6] Tooltips when hovering over Badges, Contacts, Missions and Zones
- [2.0.6] Sort Badges by release date
- [2.0.6] Copy /settitle and /thumbtack commands to the clipboard

### Changed

- [2.0.6] Updated to the [coh-content-db:2.0.0](https://github.com/n15g/coh-content-db) data model
- [2.0.6] Rebuilt the application using React instead of Angular

### Removed

- [2.0.6] Server group management - The app is specifically designed for Homecoming now
