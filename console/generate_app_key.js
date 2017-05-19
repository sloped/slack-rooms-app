require('babel-register');
require('../config/process_env.js')();
require('crypto').randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');
  if( process.env.NODE_ENV !== 'production' ) {
    console.info('Add the line to your .env file. Please note that updating this key will cause all users to be logged out.')
    console.info('--------------------------------------')
    console.info('APP_SECRET=' + token);
  }
  else {
      console.info(`Please add the following key to your environment. If using Heroku this will be a config variable called APP_SECRET. 
For other environments, please follow the instructions of the hosting provider.
${token}` )
}
});