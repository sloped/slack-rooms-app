import passport from 'passport';
module.exports = function(app) {
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/calendar.readonly'] })
    );
    app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect(301,'/');
        });
}