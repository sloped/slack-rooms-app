/* global module */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './resources/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'app.js',
    publicPath: "/js/",
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
                presets: ['es2015']
              }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
         query: {
                    presets: ['es2015']
                }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
};
