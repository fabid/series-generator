'use strict'
const R = require('ramda')
const test = require('tape')

const generator = require('../generator')


test('generating data with mean and std', function (t) {
  const mean = 3
  const std = 0.1
  var generate = generator(mean, std)

  const nPoints = 40
  var data = generate(nPoints)
  t.equal(data.length, nPoints)
  t.equal(Math.floor(R.mean(data) - mean), 0)
  t.end()
})

test('generating data with start and end value', function (t) {
  const start = 3
  const end = 9
  const std = 1
  var generate = generator(start, end, std)

  const nPoints = 30
  var data = generate(nPoints)
  t.equal(data.length, nPoints)
  t.equal(start, data[0])
  t.equal(data[nPoints - 1], end)
  t.end()
})
