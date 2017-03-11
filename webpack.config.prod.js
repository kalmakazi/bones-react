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
      '.js',
      '.jsx',
    ],
  },

  plugins: [
    new ExtractTextPlugin({filename: 'css-[hash].css'}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
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
        loader: 'babel-loader',
      },

      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
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
          ],
        }),
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
