const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin([
      'TYPEFORM_URL',
      'TYPEFORM_FORM_ID',
      'HUBSPOT_FORM_ID',
      'HUBSPOT_FORM_LANDING_PAGE_URL'
    ]),
  ],
};
