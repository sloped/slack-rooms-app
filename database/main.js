import _knex from 'knex';
import _bookshelf from 'bookshelf';
import rooms from './models/rooms.js';
import {development, production} from './knexfile.js';
let config = development; 
if( process.env.NODE_ENV === 'production') {
    config = production;
}
const knex = _knex(config);

const bookshelf = _bookshelf(knex);
const Room = bookshelf.Model.extend( rooms );
const Rooms = bookshelf.Collection.extend( {
    model: Room
});

module.exports = {bookshelf, Room, Rooms};