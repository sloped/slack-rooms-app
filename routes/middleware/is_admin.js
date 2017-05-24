module.exports = auth;

function auth(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.is_admin())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
