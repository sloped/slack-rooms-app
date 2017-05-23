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
    resolve(root, params, options, ast) {
    return new Promise( (resolve, reject) => {
        new Room( {'name' : params.name}).fetch().then( ( model ) => {
            resolve( {
                  name: model.get('name'),
                  calendar: model.get('gid')
                });
        });

    });
    }
};

module.exports = room;
