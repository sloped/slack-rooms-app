import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import process_env from './process_env.js';
import config_view_engine from './view_engine.js';
import config_static_assets from './static_assets.js';
import auth from './auth.js';

const app = express();
process_env();
config_view_engine(app);
config_static_assets(app);
auth(app);

app.use(compression()).use(bodyParser.json()).use(bodyParser.urlencoded({
  extended: true
}));

module.exports = app;
