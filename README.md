# Badger

Badger is a badge database and tracker application for City of Heroes badge hunters.

### To run the app, just visit the following link, no need to download or run anything: https://n15g.github.io/badger/

I designed badger to solve a couple of issues that have cropped up in the post-sunset era:

* The original badge hunting sites and tools are out of date.
* Much of the old tools are closed source and abandoned.
* There are now multiple server groups running, each with different badges available on their servers.

To that end, Badger is open source.
It is also designed to handle different servers with different badges available.
The badge and server data are also stored in open-source git repositories under the GPL 3.0 and also published to npm, making it easy to use in other applications if you wish.
I actively encourage anyone who wants to use the badge data for other projects to do so.

The currently supported server groups are:

* Homecoming - https://github.com/n15g/coh-content-db-homecoming

If anyone is interested in creating or maintaining the data for other server groups, let me know.

...and of course, happy badging!

Go hunt. Kill Skuls.

## Development

If you'd like to run the app locally for development purposes, here's what you'll need:

### Requirements

* [Node JS](https://nodejs.org/)
* [git](https://git-scm.com/) for source control
* For badge development an understanding of [TypeScript](https://www.typescriptlang.org/)
* For UI development, an understanding of [Angular](https://angular.dev/)

### Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm install`
3. Launch the development server `npm run start`

The app will now be accessible at http://localhost:4200.
Most changes will be reflected automatically without needing to restart the server.

### Linking changes from a content database

To test changes to a content database, like the [Homecoming Content DB](https://github.com/n15g/coh-content-db-homecoming), you'll need to
build and link that project locally.

For Homecoming specifically, you can follow the following process:

1. Clone the coh-content-db-homecoming repo: `git clone git@github.com:n15g/coh-content-db-homecoming.git`
2. From the coh-content-db-homecoming folder:
    1. Run `npm link`
    2. Make your changes to the content.
    3. Run `npm build` or `npm watch` to build automatically on changes.
3. From the badger folder:
    1. Run `npm run link:hc` to link to your local changes in the coh-content-db-homecoming folder.
    2. Run `npm run start` to start the development server and see your changes reflected in the UI.

### Updating the package version

Use [Semantic Versioning](https://semver.org/).

1. `npm version <new version>`
2. Update the [changelog](src/app/_changelog.ts).

### Building and publish

Build the application bundle and publish to github pages.

1. `npm run build`
2. `npm run pages`

```
