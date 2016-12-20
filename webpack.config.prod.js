const autoprefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/index.jsx',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js-[hash].js',
  },

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },

  plugins: [
    new ExtractTextPlugin('css-[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'index.html',
    })
  ],

  module: {
    loaders: [
      {
        loader: 'html',
        test: /\.html$/,
      },

      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      },

      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract(combineLoaders([
            {
              loader: 'css-loader',
              query: {
                modules: true,
                localIdentName: '[hash:base64]'
              }
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
            },
        ]))
      },

      {
        include: path.join(__dirname, 'app'),
        loader:'file-loader?name=img/[path][name].[ext]',
        test: /\.(jpg|jpeg|gif|png|ico)$/,
      },
    ],
  },

  postcss: [
    autoprefixer({browsers: ['last 2 versions']}),
  ],
};
