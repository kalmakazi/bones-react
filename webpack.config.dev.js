const autoprefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/index.jsx'
  ],

  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
        include: path.join(__dirname, 'app'),
        loaders: ['react-hot', 'babel'],
        test: /\.jsx?$/,
      },

      {
        test: /\.s?css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ]),
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
