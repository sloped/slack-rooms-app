import {auth} from './middleware';
module.exports = function(app) {
    app.get('/', auth, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/events/*', auth, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/about', auth, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/login', (req, res, next) => {
      if (req.isAuthenticated()) {
          res.redirect('/');
          return;
      }
      next();
      // if they aren't redirect them to the home page

    }, (req, res) => {
      res.render('index', { title: 'Hey', message: 'Hello there!' });
    });
};
