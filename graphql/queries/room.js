import {GraphQLNonNull, GraphQLString} from 'graphql';
import {Room} from '../../database';
import RoomType from '../types/room.js';
const room = {
    type: RoomType,
    args: {
        name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve(root, params, req, ast) {
    return new Promise( (resolve, reject) => {
        if( !req.isAuthenticated()) reject('Unauthorized');
        new Room( {'name' : params.name}).fetch().then( ( model ) => {
            resolve( model.formatRoom() );
        });

    });
    }
};

module.exports = room;
