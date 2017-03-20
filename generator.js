'use strict'
const R = require('ramda')

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function randomNormal(seed) {
  // Box-Muller
  var x = 1 - random(seed)
  var y = 1 - random(seed + 1)
  return Math.sqrt(-2.0 * Math.log(x)) * Math.cos(2.0 * Math.PI * y)
}

module.exports = function generator(arg1, arg2, arg3){
  let mean = 0
  let std = 1
  let start = undefined
  let end = undefined
  if (arguments.length == 2) {
    mean = arg1
    std = arg2
  }
  else if (arguments.length == 3) {
    mean = undefined
    start = arg1
    end = arg2
    std = arg3
  }

  const generate = function(nPoints, userSeed) {
    let seed = userSeed || Math.round(Math.abs(mean || start) * 10 + std * 100 + 1)
    let randomWalk = 0
    let data = R.range(0, nPoints).map(function(d, i) {
      randomWalk = randomNormal(seed + 2 * i)
      return randomWalk
    })
    const dataMean = R.mean(data)
    const squaresSum = R.sum(data.map((d) => Math.pow((d - dataMean), 2)))
    const dataStd = Math.sqrt( squaresSum / nPoints)

    const stdRatio = std / dataStd
    const corrected = data.map((d) => (d - dataMean) * stdRatio)

    if(mean != undefined) {
      return corrected.map((d) => mean + d)
    } else {
      const deltaStart = corrected[0] - start
      const deltaEnd = corrected[nPoints - 1] - end
      return corrected.map((d, i) => (d - deltaStart) + i * (deltaStart - deltaEnd) / (nPoints - 1))
    }
  }

  generate.mean = function(value) {
    if (!arguments.length) { return mean }
    mean = value;
    return generate;
  }
  generate.std = function(value) {
    if (!arguments.length) { return mean }
    std = value;
    return generate;
  }
  generate.startEnd = function(arg1, arg2) {
    if (!arguments.length) { return [start, end] }
    mean = undefined;
    start = arg1;
    end = arg2;
    return generate;
  }
  return generate
}
