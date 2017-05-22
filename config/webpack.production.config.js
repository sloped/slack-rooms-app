const webpack = require('webpack');
const Merge = require('webpack-merge');
const base = require('./webpack.config.js');

module.exports = function(env) {
  return Merge(base, {
  devtool: "#nosources-source-map",
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
  });
};