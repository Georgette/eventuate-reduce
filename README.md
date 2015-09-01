# eventuate-reduce

[![NPM version](https://badge.fury.io/js/eventuate-reduce.png)](http://badge.fury.io/js/eventuate-reduce)
[![Build Status](https://travis-ci.org/Georgette/eventuate-reduce.svg?branch=master)](https://travis-ci.org/Georgette/eventuate-reduce)
[![Coverage Status](https://coveralls.io/repos/Georgette/eventuate-reduce/badge.png?branch=master)](https://coveralls.io/r/Georgette/eventuate-reduce?branch=master)

Create a reduced eventuate

## example

```javascript

var eventuate = require('eventuate'),
    reduce    = require('eventuate-reduce')

var pie = eventuate()
pie(function (p) {
    console.log('%s served...', p.type)
})

var eatingEverything = reduce(pie, function (lastValue, pie) {
    return lastValue + ' ' + pie.type
}, 'Pies eaten so far in pie eating contest: ')

eatingEverything(function (pie) {
    console.log(pie)
})

pie.produce({type: 'apple' })
pie.produce({type: 'shoofly' })
pie.produce({type: 'pumpkin' })

eatingEverything.reset('')

pie.produce({type: 'cherry' })
pie.produce({type: 'blueberry' })

console.log('Whew, I barfed but managed to keep these pies in my belly: ', eatingEverything.lastValue)

```
## api

```javascript
var eventuate = require('eventuate')
var reduce    = require('eventuate-reduce')

var upstreamEventuate = eventuate()
```

### var reducedEventuate = reduce(upstreamEventuate, reduceFunc, [initialValue])

Returns a new eventuate which produces reduced event payloads from eventuate `upstreamEventuate` using `reduceFunc` .  `reduceFunc` should have the signature `function (lastValue, data) { }`, and return the reduced payload. This function receives the lastValue from the last `produce` and  all event data from `upstreamEventuate`.

If `upstreamEventuate` is an unmonitored eventuate, `filteredEventuate` will return an unmonitored eventuate.

Note: `initialValue` is an optional parameter used to initialize the `reduce`, and if not provided, the first payload will not perform a `reduce` or a `produce`

### reducedEventuate.lastValue

Retrieve the last produced value

### reducedEventuate.reset(resetValue)

Reset the current summation and last value to value passed in resetValue

### reducedEventuate.unsubscribe()

Stop consuming events from `upstreamEventuate` (and thus stop producing events).

### reducedEventuate.upstreamConsumer

The function added as a consumer to the `upstreamEventuate`. Example:

```javascript
var consumerIdx = upstreamEventuate.consumers.indexOf(reducedEventuate.upstreamConsumer)
assert(consumerIdx >= 0)
```

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
