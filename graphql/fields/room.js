import {GraphQLNonNull, GraphQLString } from 'graphql';
import {Room} from '../../database/main.js';
import RoomType from '../types/room.js';
const room = {   
    type: RoomType,
    args: {
        name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params, options, ast) {
    return new Promise( (resolve, reject) => {
        new Room( {'name' : params.name}).fetch().then( ( model ) => {
            resolve();
        })
        // db.get('SELECT name, gid as calendar FROM rooms WHERE name = "' + params.name + '"', function (err, row) {
        //   resolve( row );
        // })
    })
    }
}

module.exports = room;