import {GraphQLList} from 'graphql';
import {Rooms} from '../../database';
import Room from '../types/room.js';

const rooms =  {
      type: new GraphQLList(Room),
      args: {},
      resolve(root, params, req, ast) {
        return new Promise( (resolve, reject) => {
            if( !req.isAuthenticated()) reject('Unauthorized');
            Rooms.forge().fetch().then( (collection) => {
              resolve(collection.models.map( (model) => {
                return model.formatRoom();
              }));
            });
        });
      }
    };
module.exports = rooms;
