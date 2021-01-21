const { DefinePlugin } = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    // eslint-disable-next-line no-param-reassign
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    entry: ['./src/index.jsx', './src/fonts/index.css'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
    },
    devServer: {
      noInfo: false,
      open: true,
      historyApiFallback: true,
      port: 3000,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        util: require.resolve('util/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
          include: path.resolve(__dirname, './src/fonts'),
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new DefinePlugin(envKeys),
    ],
  };
};
