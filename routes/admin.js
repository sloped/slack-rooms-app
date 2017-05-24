import {is_admin} from './middleware';
module.exports = function(app) {
    app.get('/admin', is_admin, (req, res) => {
        res.render('index', { title: 'Hey', message: 'Hello there!' });
    });

};
