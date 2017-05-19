import {auth} from './middleware';
module.exports = function(app) {
    app.get('/', auth, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/events/*', auth, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

    app.get('/login', (req, res) => {
      res.render('index', { title: 'Hey', message: 'Hello there!' })
    });
}
