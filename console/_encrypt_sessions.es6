import Crypto from 'crypto';
import _knex from 'knex';
import _bookshelf from 'bookshelf';
import ModelBase from 'bookshelf-modelbase';
import {development, production} from '../database/knexfile.js';
import process_env from '../config/process_env.js';
process_env();
var encryption_options = require('../database/column_encryption_options.js');
let config = development;
let old_users = {
    tableName: 'users',
};

if( process.env.NODE_ENV === 'production') {
    config = production;
}
const knex = _knex(config);
const bookshelf = _bookshelf(knex);
bookshelf.plugin(ModelBase.pluggable);



const OldUser = bookshelf.Model.extend( old_users );
const OldUsers = bookshelf.Collection.extend( {
    model: OldUser
});
OldUsers.forge().fetch().then( (collection) => {
  Promise.all(collection.models.map( (Model) => {
    return new Promise( (resolve, reject) => {
        let encrypted_data = {
            'googleId' : encrypt(Model.get('googleId')),
            'google_access_token' : encrypt(Model.get('google_access_token'))
        };
        if( typeof Model.get('google_refresh_token') === 'string' ) {
          encrypted_data.google_refresh_token = encrypt(Model.get('google_refresh_token'));
        }
        Model.save( encrypted_data ).then((user) => {
            console.log(`Encrypted ${Model.get('name')}`);
            resolve();
        });
    });
  })).then( () => {
    process.exit();
  });
});

function encrypt(value) {
    const c = Crypto.createCipher(encryption_options.cipher, encryption_options.key)
    let crypted = c.update(value, 'utf8', 'hex');
    crypted += c.final('hex');
    return crypted;
}

