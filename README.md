### Smarter Technologies Coding Exercise
This project aims to solve the objective set out in [objective.md](objective.md).

### Installing Dependencies
Once NPM (>= 10.9.4) and NodeJS (>=22.22.0) are installed, install the project's dependencies via `npm install`.

## Running Tests
You may run the test suite via `npm run test`.

## Building
The project will need to be built before it can run.  Build the project via `npm run build`.

## Running
The project can be run via `npm run start [file]`, or `node dist/index.js [file]` where `[file]` is the path to a file consisting of lines of parcel dimensions and masses.  Included in this repository is a sample file `parcel-file.txt` for some examples of what that file can look like.

## Installing Globally
This package may be optionally installed globally and will provide a new script/command `shipping-sort`.  You may install this package globally via `npm install -g .`.  To call the new global package script, you can do so via `shipping-sort [file]`.

## Linting / Formatting
This package includes a linter (eslint) and formatter (prettier).  They may be ran via `npm run lint` and `npm run format` respectively. 

## Author Notes
Given the general time constraint of ~30 minutes, I tried my best to provide a polished solution.  However, there are a few things I would have loved to have more time to add to provide a more refined solution.
 * Reading from stdin when no file supplied - This would allow the user to use this more like a GNU-unixy tool e.g. `parcel-file.txt > shipping-sort` would feed the values from parcel-file to shipping-sort.
 * Changing some constants to configurable values.  The threshold values in [src/consts.ts](src/consts.ts) could be defined as configuration values in either a configuration file (`.shipping-sort.conf`) or as optional arguments to the command (`shipping-sort --max-volume=5000 --max-dimension=20 --max-mass=50`)
 * I normally ad pre-commit hooks to run tests and lint & format before committing, as well as enforcing a commit-msg format.  I've left these off purely to not waste time.
 * Handle alternative parcel units.  It would be pretty handy if it could accept dimensions in inches and pounds and convert to cm and kg