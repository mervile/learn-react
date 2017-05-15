const path = require('path');
const webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
/*var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require("extract-text-webpack-plugin");*/

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
  },
  module: {
    rules: [
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node-modules/},
      {test: /\.json$/, use: 'json-loader'}
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: __dirname + '/index.html',
        to: __dirname + '/dist/index.html'
      },
    ])
  ]
};
