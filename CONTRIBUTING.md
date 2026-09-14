# Contributing to Badger

Badger tracks City of Heroes: Homecoming badges in the browser. This repository contains the
application; badge and other game content is maintained in
[coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming). Content-model and
query changes belong in [coh-content-db](https://github.com/n15g/coh-content-db).

See [README.md](README.md#development) for setup, the repository layout, and the command reference.
[AGENTS.md](AGENTS.md) supplies additional instructions for coding agents.

## Working agreement

Keep changes focused on a concrete problem. Understand the current behavior and relevant tests
before changing it, and discuss consequential architecture, dependency, or data-format decisions
before implementation. Small fixes do not need a design document or a new abstraction.

Reuse the feature structure, content model, theme, and shared controls already present. Separate
useful local cleanup from broader refactoring. [TODO.md](TODO.md) records deferred work and
intentional choices; a dependency's age alone is not a reason to replace it in an unrelated PR.

Use American English and follow `.editorconfig` and ESLint. Preserve TypeScript's strict checks
and validate uncertain data at external boundaries. Avoid machine-specific paths, credentials,
generated bundles, browser databases, and test output in commits. Use compact, synthetic test
fixtures where possible; remove personal information from any sample logs being added.

## Saved data and compatibility

Badger is a released application, and backward compatibility for saved character data from released
versions and supported import/export formats is a requirement. The npm package is private because
the application is deployed as a site, not because its users' data is disposable.

Preserve saved character identity, badge records, and references when changing storage or content
handling. Do not silently clear storage, drop unfamiliar records, or substitute guessed badge
ownership to simplify a refactor. Use isolated fixtures for automated and manual development checks.

Discuss any change to a released data representation or supported format before implementation,
including how existing data will remain usable and how failures will be handled. Add migration or
compatibility code only for a demonstrated released contract and an agreed need. This does not
require preserving intermediate development formats, private implementation details, or every
historical behavior. Existing legacy import support is intentional product behavior; changing its
scope requires an explicit decision.

## Development workflow

1. Start from `master` on a branch for the change, or continue an existing task branch. Preserve
   unrelated work already in the checkout.
2. Use `.nvmrc` and the Node/npm requirements in `package.json`. Install with `npm ci`, then
   `npm run test:install` to install Chromium for browser tests.
3. Implement the change with focused tests where they provide useful confidence. Keep stories
   beside components and shared fixtures under `test/` or `.storybook/` as appropriate.
4. Update relevant documentation. Add to [CHANGELOG.md](CHANGELOG.md) under `Unreleased` only when
   end users are affected: features, fixes, game content, compatibility, or security. Describe the
   user impact. Keep tooling, tests, CI, internal refactoring, and contributor workflow details in
   PRs and contributor documentation; leave `Unreleased` empty if there are no user-facing changes.
5. Complete the relevant validation and open a PR against `master`. Keep the title and description
   aligned with the final scope after revisions.

Dependency changes must include the lockfile and respect npm's `allowScripts` policy. Review
optional addons suggested by upgrade tools. Do not use forced installs or relaxed peer constraints
as a substitute for choosing compatible package versions.

## Validation

For application code, tooling configuration, and dependency changes, the full checkpoint is:

```sh
git diff --check
npm run validate
npm run audit
```

`validate` runs ESLint, the Node and Storybook tests, TypeScript checking, and both application and
Storybook builds. `audit` checks the dependency graph. Do not suppress a compiler, lint, test, or
audit failure simply to make the checks pass; investigate it and describe any unresolved blocker.

During development, use `npm run test:unit -- <file>` or `npm run test:ui -- <story-file>` for the
affected behavior. `npm run test:watch` reruns tests while editing. Run the full checkpoint once
the code change is ready for review; repeat checks when later changes could invalidate them.

For documentation-only changes, check the diff, local links, referenced paths, and documented
commands. A full browser test and build run is unnecessary unless the change also affects code,
configuration, or executable examples.

The [PR workflow](.github/workflows/ci.yml) checks installs, dependencies, lint, types, tests, and
builds. The [release workflow](.github/workflows/release.yml) validates tags before producing
artifacts or deploying stable releases. CI uploads browser-test failure screenshots from
`test-results/`. Do not describe these checks as required branch protections unless that setting
has been verified separately.

### Choosing tests

- Prefer ordinary TypeScript tests for character state, import parsing and merging, and other
  domain behavior. Colocate `*.test.ts` with the subject; reusable fixtures belong in `test/support`.
- Use the real database implementation with `fake-indexeddb` for Node persistence tests. Keep
  each test's stored state independent and close owned connections during cleanup.
- Use Storybook interaction tests for user actions and their observable outcomes. A story needs
  a `play` function and the `interaction` tag to join the selected browser suite. The README
  describes the isolated database and reactive character fixtures.
- Query controls by accessible role or name. Await rendering and state changes with supported
  async assertions; avoid sleeps, custom polling loops, DOM structure assertions, and blanket snapshots.
- When fixing a bug, add a focused regression test that would fail without the fix where practical.
  Exercise the responsible behavior rather than asserting only that a mock callback was called.
- Verify changed visual layout and relevant interaction states in the browser. The Chromium
  suite does not establish compatibility with every browser, visual correctness, or full accessibility.

Do not pursue coverage percentages or convert every decorative story into a test. Choose tests
that protect meaningful behavior and remain useful through routine refactoring.

## Pull requests

Write for a reviewer who has not seen the development conversation. Use a concise title describing
the final outcome, such as “Keep character metadata when merging badge imports.” Conventional
Commit prefixes are not required.

Start the description with a short TL;DR: the concrete problem and resulting behavior. Follow
with a few bullets only when they help explain the main changes or consequential trade-offs.
Small changes may need only the opening paragraph. Link the relevant issue when there is one.

Omit implementation history, exhaustive file lists, routine local validation commands, and
pass-count summaries. Let PR checks report automated validation. Include material limitations,
unrun relevant checks, manual browser evidence, or data/compatibility implications when a reviewer
needs them to assess the change. Do not imply that local results prove hosted CI has passed.

Use the [PR template](.github/pull_request_template.md), deleting unused sections and guidance
comments. A typical description looks like this:

```markdown
Storybook upgrades could not discover the configuration in its custom source directory.
Moving it to the default location makes the standard upgrade command work.

## Changes

- Remove custom configuration-directory flags and the Vite root override.
- Keep the relocated configuration and helpers included in type-checking and linting.
```

For larger changes, add review notes explaining consequential decisions or remaining uncertainty. Include
screenshots for visible changes when they help a reviewer; there is no screenshot requirement
for every PR.

## Releases

Follow the [release procedure](README.md#release). Do not bump the application version or publish
a tag as an incidental part of a feature or documentation PR. Stable version tags deploy to
GitHub Pages; prerelease tags retain build artifacts without replacing the stable site.
