module.exports = function mkReducedEventuate (eventuate, reduce, init) {
    var lastValue = init

    // create a new eventuate with the parent's setting
    var reducedEventuate = eventuate.factory({ monitorConsumers: eventuate.hasConsumer !== undefined })

    // expose to external sources
    reducedEventuate.upstreamConsumer = reduceConsumer

    // destroy upstream consumer
    reducedEventuate.unsubscribe = function reducedEventuateUnsubscribe () {
        eventuate.removeConsumer(reduceConsumer)
    }

    reducedEventuate.reset = function reducedEventuateReset (resetValue) {
        reducedEventuate.lastValue = lastValue = resetValue
    }

    // create new eventuate upstream consumer
    eventuate(reduceConsumer)

    return reducedEventuate

    function reduceConsumer (data) {

        if (typeof lastValue === 'undefined') {
            reducedEventuate.lastValue = lastValue = data
        }
        else {
            reducedEventuate.lastValue = lastValue = reduce(lastValue, data)

            // act on original producers payload, and emit(produce) event
            reducedEventuate.produce(lastValue)
        }

    }
}
