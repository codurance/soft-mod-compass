const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./src/config');

module.exports = {
  entry: ['./src/client/index.js'],
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.handlebars$/, loader: 'handlebars-loader' }],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        handlebarsLoader: {},
      },
    }),
    new HtmlWebpackPlugin({
      filename: config.devEn.filename,
      compassConfig: config.devEn,
      template: './src/index.handlebars',
    }),
    new HtmlWebpackPlugin({
      filename: config.devEs.filename,
      compassConfig: config.devEs,
      template: './src/index.handlebars',
    }),
    new HtmlWebpackPlugin({
      filename: config.prodEn.filename,
      compassConfig: config.prodEn,
      template: './src/index.handlebars',
    }),
    new HtmlWebpackPlugin({
      filename: config.prodEs.filename,
      compassConfig: config.prodEs,
      template: './src/index.handlebars',
    }),
    new CleanWebpackPlugin(),
  ],
};
