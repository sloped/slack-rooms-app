import UserType from '../types/user.js';
const user = {
    type: UserType,
    resolve(root, params, options, ast) {

    return new Promise( (resolve, reject) => {
        if( options.isAuthenticated() ) {
            resolve( {
                name : options.user.get('name'),
                googleId: options.user.get('googleId'),
                id: options.user.get('id'),
                is_admin: options.user.is_admin()
            } );
        }
        else {
            resolve( null );
        }
    });
    }
};

module.exports = user;
