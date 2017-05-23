import webpack_config from './webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import express from 'express';
module.exports = function(app) {
    if( process.env.NODE_ENV !== 'production' ) {
      app.use(webpackMiddleware(webpack(webpack_config), {
        publicPath: webpack_config.output.publicPath,
        noInfo: process.env.HIDE_WEBPACK_INFO === 'true' || false,
        stats: 'minimal'
      }));
    }
    else {
      app.use(express.static('public'));
    }
}