const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const config = require('./src/client/config');

module.exports = {
  entry: ['./src/client/app.js'],
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
      ...htmlPluginOptions,
      filename: config.devEn.filename,
      compassConfig: config.devEn,
    }),
    new HtmlWebpackPlugin({
      ...htmlPluginOptions,
      filename: config.devEs.filename,
      compassConfig: config.devEs,
    }),
    new HtmlWebpackPlugin({
      ...htmlPluginOptions,
      filename: config.prodEn.filename,
      compassConfig: config.prodEn,
    }),
    new HtmlWebpackPlugin({
      ...htmlPluginOptions,
      filename: config.prodEs.filename,
      compassConfig: config.prodEs,
    }),
    new CleanWebpackPlugin(),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]),
  ],
};
