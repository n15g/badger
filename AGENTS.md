# Badger agent guidance

These instructions apply to the entire repository. Read [CONTRIBUTING.md](CONTRIBUTING.md)
for contribution and PR conventions, [README.md](README.md) for setup and commands, and
[TODO.md](TODO.md) before revisiting deliberate technical decisions.

## Working agreement

- Inspect `git status --short --branch` before editing. Preserve unrelated changes.
- Use American English. Keep changes cohesive and limited to the requested outcome.
- Investigate existing code, tests, and content contracts before proposing significant changes.
  Explain consequential changes to dependencies, persistence, public interfaces, or architecture
  before implementing them. Routine local decisions do not need another approval step.
- Work serially by default. Propose a specific independent subtask and obtain approval before
  delegating to another agent.
- Commit only when the user requests it. A request to merge also authorizes necessary integration
  commits. Use the configured Git identity; do not change it without instruction.
- Do not commit machine-specific paths, credentials, IDE state, generated bundles, test databases,
  screenshots, or diagnostic logs. Review the diff before staging or committing.

## Repository and responsibilities

- Badger is a browser application built with React, TypeScript, and Vite. Character data is stored
  locally in IndexedDB; there is no application backend. Do not introduce server infrastructure
  or remote persistence without an agreed requirement.
- Keep application code under `src/app`, organized by feature. Keep component stories and focused
  logic tests beside their subjects. Imported images and fonts belong in `src/assets`.
- Use `.storybook` for Storybook configuration, decorators, and fixtures. Shared test helpers and
  sample import files belong in `test/support` and `test/fixtures`. See the README for the full layout.
- `coh-content-db` provides the content model and query behavior. Homecoming badge, mission, zone,
  and contact data is maintained in `coh-content-db-homecoming`, not this repository. Reuse those
  contracts instead of duplicating content rules or adding hardcoded badge corrections to the UI.
- Keep rendering, character mutations, and persistence responsibilities clear. Use the existing
  character providers and database boundary. Extract cohesive TypeScript logic when it improves
  reuse or testability; do not introduce a new state framework or service layer just to write tests.
- Use the existing Joy UI theme, Base UI integrations, and shared controls. Review nearby stories
  when changing a component, including disabled, loading, empty, and error states where applicable.
- Treat badge ownership, requirement progress, alignment-dependent presentation, and import merging
  as distinct behaviors. Changes to one must not silently redefine another.

## Released data

- Badger is released. Backward compatibility for released saved character data and supported
  import/export formats is a requirement; follow [the data policy](CONTRIBUTING.md#saved-data-and-compatibility).
  The package's `private` flag means it is not published to npm, not that the application is unreleased.
- Preserve user records and stable content references. Do not use personal browser storage as a
  test fixture or clear it to resolve an implementation problem.
- Discuss changes to stored representations or supported formats before implementation. Add only
  compatibility or migration code justified by a concrete released contract and the agreed change;
  do not preserve every intermediate development representation or internal implementation detail.

## Implementation and dependencies

- Follow `.editorconfig` and ESLint: two-space TypeScript indentation, single quotes, and no
  semicolons. Match the existing explicit `.ts`/`.tsx` relative imports and component naming.
- Preserve strict TypeScript and nullable analysis. Represent untrusted input as `unknown`, narrow
  at parsing, network, storage, and framework boundaries, and keep validated internal contracts clear.
  Do not add `any`, non-null assertions, casts, or lint suppressions merely to silence diagnostics.
- Preserve immutable character values and use the existing Immer recipes for updates. Await
  persistence and relevant state refreshes; do not treat a callback invocation as a completed save.
- Use the Node version selected by `.nvmrc` and npm version declared in `package.json`. Check the
  actual active versions before troubleshooting install failures; `packageManager` alone does not
  switch an existing shell's npm binary.
- Use `npm ci` for reproducible installs. Update and review `package-lock.json` with dependency
  changes. Preserve the explicit `allowScripts` policy; do not bypass peer constraints or enable
  all install scripts to make an upgrade pass.
- Keep the Storybook package family aligned and Vitest/browser-provider versions compatible with
  the addon. Use `npm run upgrade:storybook` and review optional additions from the upgrader.
- Consult the maintenance backlog before replacing Moment, Joy UI, Base UI, or `shortid`, changing
  eager loading, or removing browser polyfills. Those are separate decisions, not routine cleanup.

## Validation and delivery

- Follow the proportional validation guidance in [CONTRIBUTING.md](CONTRIBUTING.md#validation).
  Run focused tests during iteration and the full gate for code, configuration, or dependency changes.
- Test stable observable behavior and important boundaries. Prefer small deterministic fixtures;
  do not make tests depend on live content servers or personal browser data.
- Render every Storybook story in the browser suite; add `play` functions tagged `interaction` for
  behavior that needs assertions. The tag is descriptive, not a test-discovery filter. Await named
  elements and observable state using the test library's async utilities. Avoid fixed delays,
  custom polling loops, CSS selectors, and broad DOM snapshots.
- Keep storage and character fixtures isolated. Use `storyParameters` to opt into an isolated
  database through character fixtures; display stories should not open storage. Inject the real
  database into `BadgerDbProvider` and retain the real character providers and persistence operations.
  Keep dependent wrappers together in `StorybookProviders`, with the theme outside all Joy UI.
  Use memory routing for stories and keep scenario settings separate from component args. Do not
  replace the behavior under test with a mock that can only confirm its own implementation.
- Add a focused regression test when fixing a bug, demonstrating the failure before the fix where
  practical. Do not encode speculative future behavior in the suite.
- Update `CHANGELOG.md` under `Unreleased` only for changes that affect end users: features,
  fixes, game content, compatibility, or security. Describe the user impact. Keep tooling,
  tests, CI, refactoring, and contributor workflow changes in PRs and relevant documentation;
  leave `Unreleased` empty when there are no user-facing changes. Keep release versioning
  and deployment separate from ordinary feature work.
- Report what changed, what was checked, and any remaining uncertainty in the handoff. Do not claim
  visual, accessibility, cross-browser, or hosted CI verification from checks that did not cover it.
- Follow the [PR format](CONTRIBUTING.md#pull-requests). Lead with the problem and resulting behavior;
  omit routine local command transcripts and automated results that PR checks already report.
