# Releasing Badger

Releases are handled by the [release workflow](../.github/workflows/release.yml).
Follow [Development](development.md) to set up the project first.

1. Determine the next [Semantic Version](https://semver.org), such as `2.4.0` or `2.4.0-rc.1`.
2. Move the release notes from `Unreleased` into a versioned section in [CHANGELOG.md](../CHANGELOG.md), then commit them.
3. Run `npm run validate` and `npm run audit`.
4. Run `npm version <version>` to update `package.json` and `package-lock.json`, create the version commit, and add the corresponding `v`-prefixed tag.
5. Run `npm run push` to push the commit and tags.

Every matching tag is validated and produces a downloadable application artifact. Stable tags such as `v2.4.0` deploy that artifact to GitHub Pages; prerelease tags such as `v2.4.0-rc.1` do not replace the production site. Badger is a private application package and is not published to npm.
