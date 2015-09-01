
var eventuate = require('eventuate'),
    reduce    = require('..')

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
