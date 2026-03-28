# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-03-28

### Added

- [2.3.0] Support for gameIds in badge data
- [2.3.0] Settings page with the option to change where the game data is fetched from

---

## [2.2.3] - 2026-03-13

### Fixed

- [2.2.3] Fixed incorrectly muted icons on the global badge list

### Added

- [2.2.2] Update related badges when a badge is collected (e.g. Accolades that require that badge) [(#60)](https://github.com/n15g/badger/issues/60)
- [2.2.2] Added a progress indicator to the badge list and badge view for badges that have multiple requirements [(#60)](https://github.com/n15g/badger/issues/60)
- [2.2.0] Sort the character list by server
- [2.2.0] Added character origins to improve Praetorian badge variant display [(#58)](https://github.com/n15g/badger/issues/58)

### Changed

- [2.2.2] Switched from brightness to opacity filter for better appearance of muted elements on light mode [(#60)](https://github.com/n15g/badger/issues/60)
- [2.2.2] Link from the badge view to the badge list under a character now shows the badge list tab correctly [(#60)](https://github.com/n15g/badger/issues/60)
- [2.2.1] Display invention count requirements on badge list [(#59)](https://github.com/n15g/badger/issues/59)

---

## [2.1.3] - 2026-01-19

### Fixed

- [2.1.3] Character Import Modal Doesn't Scroll [(#57)](https://github.com/n15g/badger/issues/57)
- [2.1.2] Import merge was doing nothing [(#56)](https://github.com/n15g/badger/issues/56)
- [2.1.0] Links in badge tooltip are broken [(#54)](https://github.com/n15g/badger/issues/54)
- [2.1.0] Settitle script was missing badges [(#55)](https://github.com/n15g/badger/issues/55)

### Added

- [2.1.0] Character import and export, and log parser [(#50)](https://github.com/n15g/badger/pull/50)
- [2.1.0] Polyfills for pre-2023 browser support [(#51)](https://github.com/n15g/badger/pull/51)
- [2.1.0] Collect multiple badges simultaneously from the badge list [(#53)](https://github.com/n15g/badger/pull/53)

### Changed

- [2.1.0] Badge character list now links to the clicked character's badge page [(#52)](https://github.com/n15g/badger/issues/52)

### Security

- [2.1.0] Bumped `react-router` version due to reported vulnerabilities < 7.12.0

----

## [2.0.7] - 2026-01-08

### Added

- [2.0.7] Show characters that have a badge on the badge view [(#49)](https://github.com/n15g/badger/pull/49)
- [2.0.6] Contact, Mission and Zone data
- [2.0.6] Tooltips when hovering over Badges, Contacts, Missions and Zones
- [2.0.6] Sort Badges by release date
- [2.0.6] Copy /settitle and /thumbtack commands to the clipboard

### Changed

- [2.0.6] Updated to the [coh-content-db:2.0.0](https://github.com/n15g/coh-content-db) data model
- [2.0.6] Rebuilt the application using React instead of Angular

### Removed

- [2.0.6] Server group management— The app is specifically designed for Homecoming now
