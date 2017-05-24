import UserType from '../types/user.js';
const user = {
    type: UserType,
    resolve(root, params, req, ast) {

      return new Promise( (resolve, reject) => {
         if( !req.isAuthenticated()) reject('Unauthorized');
          resolve( {
              name : req.user.get('name'),
              googleId: req.user.get('googleId'),
              id: req.user.get('id'),
              is_admin: req.user.is_admin()
          } );
      });
    }
};

module.exports = user;
