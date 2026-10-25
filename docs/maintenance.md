# Maintenance

The [maintenance backlog](../TODO.md) records deferred work and deliberate technical decisions.
Consult it before replacing an existing library or changing the browser-support or loading policy.

## Dependency updates

Run `nvm install` and `nvm use` if you manage Node with nvm. npm 12 requires a supported Node patch version;
early Node 24 releases are not supported.

Use [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) to check for package updates:

1. `npx npm-check-updates`
2. `npx npm-check-updates -u`
3. `npm install`

For Storybook upgrades, run `npm run upgrade:storybook`. This runs the official upgrader and updates the Storybook
packages together. The equivalent command is:

```sh
npx storybook@latest upgrade
```

Review the upgrader's optional addon suggestions before accepting them, then run `npm run validate` and `npm run audit`.

Dependency updates must include the lockfile and preserve the `allowScripts` policy in
[`package.json`](../package.json). See [Contributing](../CONTRIBUTING.md#development-workflow)
for the development workflow and [Testing](testing.md) for test commands and fixtures.
