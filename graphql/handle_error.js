module.exports = formatError;
function formatError(error) {
  if( process.env.NODE_ENV === 'production') {
    return error.message;
  }
  return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
        path: error.path
  };
}
