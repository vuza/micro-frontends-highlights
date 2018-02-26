var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var path = require('path')
var config = require('config')
var fs = require('fs')
var NodemonPlugin = require('nodemon-webpack-plugin')
var {ncp} = require('ncp')

var isProduction = process.env.NODE_ENV === 'production'
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [new NodemonPlugin()]
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : []

var commonLoaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
]

// Make node-config available
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

if (!fs.existsSync('./dist/config')) {
  fs.mkdirSync('./dist/config')
}

fs.writeFileSync(path.resolve(__dirname, './dist/config/default.json'), JSON.stringify(config))

// Copy assets to dist
ncp(path.resolve(__dirname, './assets'), path.resolve(__dirname, './dist/assets'))

module.exports = [{
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    fs: 'empty'
  },
  externals: nodeExternals(),
  plugins: productionPluginDefine,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ].concat(commonLoaders)
  }
}, {
  entry: './src/ui/highlights/browser.js',
  output: {
    path: './dist/assets/highlights',
    filename: 'bundle.js'
  },
  plugins: clientLoaders,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  }
}]
