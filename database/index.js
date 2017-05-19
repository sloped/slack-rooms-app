import _knex from 'knex';
import _bookshelf from 'bookshelf';
import ModelBase from 'bookshelf-modelbase';
import {rooms, users, sessions} from './models';
import {development, production} from './knexfile.js';
let config = development; 
if( process.env.NODE_ENV === 'production') {
    config = production;
}
const knex = _knex(config);
const bookshelf = _bookshelf(knex);
bookshelf.plugin(ModelBase.pluggable);

const Room = bookshelf.Model.extend( rooms );
const Rooms = bookshelf.Collection.extend( {
    model: Room
});
const User = bookshelf.Model.extend( users );

const Session = bookshelf.Model.extend( sessions );

module.exports = {bookshelf, Room, Rooms, User, Session};