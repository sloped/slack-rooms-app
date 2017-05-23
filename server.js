var env = require('./config/process_env.js')();
import app from './config/app.js';
import routes from './routes';
routes(app);

app.listen(process.env.PORT, () => {
  console.info(`Server running on port ${process.env.PORT}`);
});
