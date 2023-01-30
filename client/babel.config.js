module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['babel-plugin-transform-scss', '@babel/plugin-transform-runtime'],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-runtime'],
    },
  },
  exclude: [
    new RegExp(
      './node_modules/(?!public-ip|is-ip|ip-regex|indent-string|aggregate-error|clean-stack|escape-string-regexp).+\\.js$'
    ),
  ],
};
