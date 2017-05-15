import express from 'express';
import swig  from'swig';
import webpack_config from './webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import bodyParser from 'body-parser';

const app = express();

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', './views')
app.use(express.static('public'))
app.set('view cache', false);

swig.setDefaults({ cache: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(webpackMiddleware(webpack(webpack_config), {
  publicPath: webpack_config.output.publicPath
}));
module.exports = app;