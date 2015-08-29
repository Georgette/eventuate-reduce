module.exports = function mkReducedEventuate (eventuate, reduce, init) {
    // create a new eventuate with the parent's setting
    var reducedEventuate = eventuate.factory({ monitorConsumers: eventuate.hasConsumer !== undefined })

    // expose to external sources
    reducedEventuate.upstreamConsumer = reduceConsumer

    // destroy upstream consumer
    reducedEventuate.unsubscribe = function reducedEventuateUnsubscribe () {
        eventuate.removeConsumer(reduceConsumer)
    }

    // create new eventuate upstream consumer
    eventuate(reduceConsumer)

    return reducedEventuate
    var lastValue = init;
    function reduceConsumer (data) {

        if ( typeof lastValue === 'undefined') {
            lastValue = data
        } else {
            lastValue = reduce( lastValue, data, init )
        }

        // act on original producers payload, and emit(produce) event
        reducedEventuate.produce(lastValue)
    }
}
