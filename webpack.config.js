module.exports = {
  //entry: ['./index.js', './utils.js', './redux.js', './destination', './maths.js', './actions.js'],
  entry: ['./index.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
}
