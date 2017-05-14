var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  /*
   * app.ts represents the entry point to your web application. Webpack will
   * recursively go through every "require" statement in app.ts and
   * efficiently build out the application's dependency tree.
   */
  /*entry: [
    'whatwg-fetch',
    //'react-hot-loader/patch',
    //'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
    //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.tsx',
  ],*/
  entry: './src/index.tsx',

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: path.resolve('dist'),
    publicPath: '/dist',
    filename: "bundle.js"
  },
  devServer: {
      inline: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
  },

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".scss", ".css"]
  },

  module: {
    /*
     * Each loader needs an associated Regex test that goes through each
     * of the files you've included (or in this case, all files but the
     * ones in the excluded directories) and finds all files that pass
     * the test. Then it will apply the loader to that file.
     */
    loaders: [
      // Extract css files
      /*{
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
                      fallbackLoader: "style-loader",
                      loader: "sass-loader"
                  })
      },*/
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css!sass?")
      },
      {
        test: /\.tsx?$/,
        loaders: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ]
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("main.css"),
    new CopyWebpackPlugin([
      {
        from: __dirname + '/index.html',
        to: __dirname + '/dist/index.html'
      },
    ])
  ],
  // Special setup for enzyme
 /* externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }*/
};

module.exports = config;