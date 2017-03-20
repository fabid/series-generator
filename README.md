# series-generator

A simple library to generate data series, in particular time series.

It is useful for generating test data, for examples for charts.

It takes only a few parameters to create a generator:

* the data mean value, or alternatively the data start and end values
* the standard deviation from the mean (or straight line between start and end value)

The generator can be used to generate any number of points.

The random values are generated using gaussian random walk. The seed of the random number generator is derived from the input parameters: the data will always be the same for the same input. This is helpful when generating mock data that should be consistent. The seed can alternatively be provided to the generator.

## Installation

```sh
npm install series-generator
```

## usage

```js
var seriesGenerator = generator(3, 1)

var data =  seriesGenerator(4)
// [1.6818927669247243, 3.2445565313197626, 2.516758176621571, 0.5567925251339427]
```

## API reference

<a name="_generateMean" href="#_generateMean">#</a> <i>generator</i>(<i>mean</i>, <i>std</i>)

Returns a generator for data with the given *mean* and *std*.

<a name="_generatePoints" href="#_generatePoints">#</a> <i>generator</i>(<i>start</i>, <i>end</i>, <i>std</i>)

Returns a generator for data with the given *start* and *end* values and standard deviation around the slope *std*.

