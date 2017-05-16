import express from 'express';
import fs from 'fs';
import swig  from'swig';
import webpack_config from './webpack.config.js';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import env from 'node-env-file';
if (fs.existsSync('.env')) {
    env('.env');
}

const app = express();

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', './views')
if( process.env.ENVIRONMENT === 'production') {
  app.set('view cache', true);
  swig.setDefaults({ cache: 'memory' });
}
else {
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}




app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

if( process.env.ENVIRONMENT !== 'production' ) {
  app.use(webpackMiddleware(webpack(webpack_config), {
    publicPath: webpack_config.output.publicPath
  }));
}
else {
  app.use(express.static('public'))
}



module.exports = app;