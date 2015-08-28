# eventuate-reduce

[![NPM version](https://badge.fury.io/js/eventuate-reduce.png)](http://badge.fury.io/js/eventuate-reduce)
[![Build Status](https://travis-ci.org/Georgette/eventuate-reduce.svg?branch=master)](https://travis-ci.org/Georgette/eventuate-reduce)
[![Coverage Status](https://coveralls.io/repos/Georgette/eventuate-reduce/badge.png?branch=master)](https://coveralls.io/r/Georgette/eventuate-reduce?branch=master)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/Georgette_github.svg)](https://saucelabs.com/u/Georgette_github)

create a reduced eventuate

## example

```javascript
TODO
```

## api

TODO

## install

With [npm](https://npmjs.org) do:

```
npm install eventuate-reduce
```

## testing

`npm test [--dot | --spec] [--phantom] [--grep=pattern]`

Specifying `--dot` or `--spec` will change the output from the default TAP style. 
Specifying `--phantom` will cause the tests to run in the headless phantom browser instead of node.
Specifying `--grep` will only run the test files that match the given pattern.

### browser test

`npm run browser-test`

This will run the tests in all browsers (specified in .zuul.yml). Be sure to [educate zuul](https://github.com/defunctzombie/zuul/wiki/cloud-testing#2-educate-zuul) first.

### coverage

`npm run coverage [--html]`

This will output a textual coverage report. Including `--html` will also open 
an HTML coverage report in the default browser.
