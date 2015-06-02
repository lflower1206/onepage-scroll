'use strict';
var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  output: {
      path: path.join(__dirname, 'dist'),
      filename: 'fullpage.min.js',
      publicPath: 'dist/'
  },

  cache: true,
  entry: [
      'webpack/hot/only-dev-server',
      './src/components/App.js'
  ],

  stats: {
      colors: true,
      reasons: true
  },

  resolve: {
      extensions: ['', '.js'],
      alias: {
          'components': __dirname + '/src/components/'
      }
  },
  module: {
    loaders: [{
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'jsxhint!react-hot'
    },
    {
        test: /fullpage.scss$/,
        loader : ExtractTextPlugin.extract(
           'style-loader', 
           'css-loader!sass-loader?includePaths[]=' 
            + path.resolve(__dirname, './node_modules/compass-mixins/lib')
        )
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('fullpage.min.css')
  ]

};
