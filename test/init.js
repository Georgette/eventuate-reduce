var test        = require('tape'),
    reduce      = require('..'),
    eventuate   = require('eventuate')

test('should be a function', function (t) {
    t.equal(typeof reduce, 'function')
    t.end()
})

test('eventuate reduce with initial value', function (t) {
    t.plan(8)

    var event = eventuate()
    var initValue = 10

    var summateWithInit = reduce(event, function (lastValue, value) { return lastValue + value }, initValue)

    t.ok(~event.consumers.indexOf(summateWithInit.upstreamConsumer), 'adds consumer to upstream event')

    t.ok(summateWithInit.consumerAdded, 'has consumerAdded')
    t.ok(summateWithInit.consumerRemoved, 'has consumerRemoved')
    t.ok(summateWithInit.hasConsumer !== undefined, 'has hasConsumer')

    var eventCount = 0
    event(function () {
        eventCount++
    })

    var summateWithInitCount = 0
    var reducedValues = []
    summateWithInit(function (v) {
        reducedValues.push(v)
        summateWithInitCount++
        if (summateWithInitCount === 3) {
            t.deepEqual(reducedValues, [12, 96, 104], 'should summate from inital value of 10, to 12, 96, 104, given 2, 84, 8')
        }
    })

    t.true(summateWithInit.hasConsumer, 'registers consumers')

    event.produce(2)
    event.produce(84)
    event.produce(8)

    // after unsubscribe, no more events should propogate
    summateWithInit.unsubscribe()
    t.notOk(~event.consumers.indexOf(summateWithInit.upstreamConsumer), 'unsubscribe removes consumer from upstream event')
    event.produce(1)
    event.produce(1)

    t.equal(eventCount, 5, 'produce 5 events')

})

test('eventuate reduce without initial value ', function (t) {
    t.plan(6)

    var event = eventuate()

    var summateWithoutInit = reduce(event, function (lastValue, value) { return lastValue + value })

    var eventCount = 0
    event(function () {
        eventCount++
    })

    // var summateWithoutInitCount = 0
    var reducedValues = []
    summateWithoutInit(function (v) {
        t.equal(v, summateWithoutInit.lastValue, 'each produced value should equal lastValue')
        reducedValues.push(v)
    })

    event.produce(2)
    t.equal(summateWithoutInit.lastValue, 2)
    event.produce(84)
    t.equal(summateWithoutInit.lastValue, 86)
    event.produce(8)
    t.equal(summateWithoutInit.lastValue, 94)
    t.deepEqual(reducedValues, [86, 94], 'should summate given 2, 84, 8 as 86, 94')

})

test('eventuate reduce with reset', function (t) {
    t.plan(12)

    var event = eventuate()

    var summateWithoutInit = reduce(event, function (lastValue, value) { return lastValue + value })
    t.ok(summateWithoutInit.reset, 'has reset')

    var eventCount = 0
    event(function () {
        eventCount++
    })

    // var summateWithoutInitCount = 0
    var reducedValues = []
    summateWithoutInit(function (v) {
        t.equal(v, summateWithoutInit.lastValue, 'each produced value should equal lastValue')
        reducedValues.push(v)
    })

    event.produce(2)
    t.equal(summateWithoutInit.lastValue, 2)

    event.produce(84)
    t.equal(summateWithoutInit.lastValue, 86)

    event.produce(8)
    t.equal(summateWithoutInit.lastValue, 94)
    summateWithoutInit.reset(0)
    t.equal(summateWithoutInit.lastValue, 0)

    event.produce(120)
    t.equal(summateWithoutInit.lastValue, 120)

    event.produce(200)
    t.equal(summateWithoutInit.lastValue, 320)
    t.deepEqual(reducedValues, [86, 94, 120, 320], 'should summate given 2, 84, 8 reset to 0, 120, 200 as 86, 94, 120, 320')

})
