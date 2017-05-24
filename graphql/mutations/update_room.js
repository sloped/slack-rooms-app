import {GraphQLInt} from 'graphql';
import {Room as RoomModel} from '../../database';
import Room from '../types/room.js';
import RoomInput from '../inputs/room_input.js';

const update_room_mutation = {
  type: Room,
  description: 'Update Room name and Calendar ID',
  args: {
    id: {type: GraphQLInt},
    input: {type: RoomInput}
  },
  resolve: ( root, {id, input}, req, ast) => {
    return new Promise( (resolve, reject) => {
      if( !req.isAuthenticated()) reject('Unauthorized');
      if( !req.user.is_admin()) reject('Unauthorized');
      input.gid = input.calendar;
      delete input.calendar;
      return RoomModel.update( input, {id}).then( (model) => {
        resolve(model.formatRoom());
      });
    });
  }
};

module.exports = update_room_mutation;
