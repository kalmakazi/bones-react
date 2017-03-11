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
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        use: [
          {
            loader: 'react-hot-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
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
        ],
      },

      {
        test: /\.(jpg|jpeg|gif|png|ico)$/,
        include: path.join(__dirname, 'app'),
        loader:'file-loader',
        options: {
          name: 'img/[path][name].[ext]'
        },
      },
    ],
  },
};
