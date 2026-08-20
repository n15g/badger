# Maintenance Backlog

This backlog records non-critical maintenance work and deliberate technical decisions. None of these items currently block releases.

## Candidate Work

### Review npm install-script policy

npm 12 blocks dependency install scripts unless they are explicitly covered by the project's `allowScripts` policy. The current install reports blocked scripts for `core-js` and `esbuild`, while clean installation, application builds, and Storybook builds still pass.

- Review what each script does before approving or denying it.
- Pin any approval to the reviewed package version.
- Confirm the decision on every supported development and CI platform.

### Replace Moment

[Moment](https://momentjs.com/docs/#/-project-status/) is a stable legacy project in maintenance mode. Badger uses it for relative timestamps and a small number of display formats.

- Prefer standard `Intl` APIs if they can preserve the current display behavior.
- Decide how ordinal dates and relative-time thresholds should behave before replacing it.
- Treat this as maintainability and bundle cleanup, not a security fix.

### Adopt the renamed Base UI package

Badger directly uses `@base-ui-components/react` for five popovers. The stable package is now named [`@base-ui/react`](https://base-ui.com/react/overview/releases/v1-0-0).

- Keep this separate from any Joy UI migration.
- Verify positioning, dismissal, focus restoration, and keyboard interaction in each popover.
- Make the change only when there is time for an interaction smoke test.

### Add focused logic tests

The project currently relies on TypeScript, ESLint, application builds, and Storybook builds rather than an automated test suite.

- Add tests when changing high-risk logic such as character import, merging, persistence, or content-source selection.
- Prefer stable domain behavior over broad UI snapshots or coverage targets.
- Introduce a test runner only when the first concrete tests justify it.

### Define the browser-support policy

The Vite legacy build and selected polyfills support older browsers, but the intended compatibility range is not documented.

- Establish the supported browser baseline before adopting newer browser APIs or removing legacy output.
- Revisit the legacy build only when compatibility requirements or measured build costs justify it.

### Reassess Joy UI when there is a concrete driver

Badger is extensively built on the beta `@mui/joy` package, which also brings in the deprecated `@mui/base` package. [MUI has put active Joy UI development on hold](https://mui.com/blog/2026-and-beyond/), so a future replacement may eventually be appropriate.

- Do not migrate solely to remove a deprecation warning.
- Compare the visual, accessibility, theming, and maintenance implications of Material UI, Base UI, and other candidates before choosing one.
- Treat migration as a dedicated product and design project rather than routine dependency maintenance.

## Accepted Decisions

### Retain `shortid`

`shortid` is deprecated by its maintainers, but Badger uses it only to distinguish a small number of local entities. These identifiers are not authentication tokens, security boundaries, or distributed database keys.

Short identifiers keep client-side URLs readable, existing persisted identifiers remain compatible, and the practical collision risk in this usage is low. Reconsider this decision if identifiers become shared across clients, generated at substantially higher volume, or used as a security control.

### Keep eager application loading

Badger is a static client-side application with no application server after its content is loaded. Loading the complete application up front avoids route-chunk failures and provides predictable navigation on slow or intermittent connections.

Reconsider lazy loading only in response to measured user-facing load problems or significant bundle growth.
