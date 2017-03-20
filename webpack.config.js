var path = require("path");

module.exports = {
  entry: {
    generator: ["./generator.js"],
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "[name]"
  },
  externals: {
    "ramda": "ramda",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: "inline-source-map"
};
