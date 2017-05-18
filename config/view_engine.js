import swig  from'swig';

module.exports = function(app) {
    app.engine('swig', swig.renderFile);
    app.set('view engine', 'swig');
    app.set('views', './views')
    if( process.env.NODE_ENV === 'production') {
      app.set('view cache', true);
      swig.setDefaults({ cache: 'memory' });
    }
    else {
      app.set('view cache', false);
      swig.setDefaults({ cache: false });
    }
}
