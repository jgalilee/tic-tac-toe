const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: {
      index: './dist/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /(server)/,
          /(test)/,
          /(node_modules)/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-export-extensions'),
              require('babel-plugin-transform-class-properties'),
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin(['index.html', 'favicon.ico'].map(file => ({
      from: path.resolve(__dirname, './src/assets/', file),
      to: file,
    }))),
  ],
};
