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
      filename: config.devEn.filename,
      compassConfig: config.devEn,
      template: './src/client/index.handlebars',
      inject: true,
    }),
    new HtmlWebpackPlugin({
      filename: config.devEs.filename,
      compassConfig: config.devEs,
      template: './src/client/index.handlebars',
    }),
    new HtmlWebpackPlugin({
      filename: config.prodEn.filename,
      compassConfig: config.prodEn,
      template: './src/client/index.handlebars',
    }),
    new HtmlWebpackPlugin({
      filename: config.prodEs.filename,
      compassConfig: config.prodEs,
      template: './src/client/index.handlebars',
    }),
    new CleanWebpackPlugin(),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]),
  ],
};
