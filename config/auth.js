import express_session from 'express-session';
import bookshelfStore from 'connect-bookshelf';
import {User, Session} from '../database';
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = function(app) {
    const session_store = bookshelfStore(express_session);

    app.use(express_session({
        secret: process.env.APP_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new session_store({model: Session})
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
        function(accessToken, refreshToken, profile, done) {
                User.findOrCreate({ googleId: profile.id }).then( (user) => {
                    user.save( {
                        'name' : profile.displayName,
                        'google_access_token' : accessToken,
                        'google_refresh_token' : refreshToken
                    }, {patch: true}).then((user) => {

                        return done(null, user);
                    });
                });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.get('id'));
    });

    passport.deserializeUser(function(user, done) {
        User.findById(user).then( (user) => {
            done(null, user);
        });
    });
};
