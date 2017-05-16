const path = require('path');
const webpack = require('webpack');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.prod.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
  },
  module: {
    rules: [
      {test: /\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ["css-loader", 'sass-loader']
        })
      },
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node-modules/},
      {test: /\.json$/, use: 'json-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/index.html',
        to: __dirname + '/dist/index.html'
      },
    ])
  ]
};
