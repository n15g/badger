# Changelog

This changelog records changes that affect people using Badger: features, fixes,
game content, compatibility, and security. Development tooling and internal
maintenance are documented in pull requests and contributor documentation.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0] - 2026-09-14

### Changed

- Removed automatic badge collection and removal when requirements change.  
  Mark completed badges manually or update them through an import. ([#88](https://github.com/n15g/badger/issues/88))
- Updated the build system and development tooling, including Storybook and automated tests.

## [2.4.0] - 2026-08-20

### Added

- Displayed the application version and build time alongside the content metadata.

### Security

- Updated application dependencies to address known security vulnerabilities.

### Changed

- Updated Homecoming badge and game data to version 2.3.0.
- Prerelease builds no longer replace the stable app.

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

- Improved the appearance of muted elements in light mode ([#60](https://github.com/n15g/badger/issues/60)).
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

## [2.1.0] - 2026-01-14

### Fixed

- Fixed broken links in badge tooltips ([#54](https://github.com/n15g/badger/issues/54)).
- Fixed badges missing from the set-title script ([#55](https://github.com/n15g/badger/issues/55)).

### Added

- Character import and export, and a log parser ([#50](https://github.com/n15g/badger/pull/50)).
- Improved compatibility with older browsers ([#51](https://github.com/n15g/badger/pull/51)).
- Collect multiple badges simultaneously from the badge list ([#53](https://github.com/n15g/badger/pull/53)).

### Changed

- The badge character list now links to the clicked character's badge page ([#52](https://github.com/n15g/badger/issues/52)).

### Security

- Updated application dependencies to address known security vulnerabilities.

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

### Removed

- Server group management; the app is now specifically designed for Homecoming.
