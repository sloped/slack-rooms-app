import env from 'node-env-file';
module.exports = function() {
    if(process.env.NODE_ENV !== 'production') {
      try {
        env('.env');
      }
      catch (ex) {
        console.error('You must create a .env file. ');
        console.info('Bailing!');
        process.exit(0);
      }
    }
};
