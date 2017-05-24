import {GraphQLInt} from 'graphql';
import {Room as RoomModel} from '../../database';
import Room from '../types/room.js';

const update_room_mutation = {
  type: Room,
  description: 'Deletes a Room',
  args: {
    id: {type: GraphQLInt}
  },
  resolve: ( root, {id}, req, ast) => {
    return new Promise( (resolve, reject) => {
      if( !req.isAuthenticated()) reject('Unauthorized');
      if( !req.user.is_admin()) reject('Unauthorized');
      return RoomModel.findById( id ).then( (model) => {
        var previous = model.formatRoom();
        return model.destroy().then( (status) => {
          resolve(previous);
        });
      });
    });
  }
};

module.exports = update_room_mutation;
