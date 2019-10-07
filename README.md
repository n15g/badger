# Badger

Badger is a badge database and tracker application for City of Heroes badge hunters.

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

#### Development server

```
npm install
npm run start
```

#### Build

```
npm run build
npm publish
```
