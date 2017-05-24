import {Room as RoomModel} from '../../database';
import Room from '../types/room.js';
import RoomInput from '../inputs/room_input.js';

const update_room_mutation = {
  type: Room,
  description: 'Create a Room',
  args: {
    input: {type: RoomInput}
  },
  resolve: ( root, {input}, req, ast) => {
      return new Promise( (resolve, reject) => {
        if( !req.isAuthenticated()) reject('Unauthorized');
        if( !req.user.is_admin()) reject('Unauthorized');
        input.gid = input.calendar;
        delete input.calendar;
        RoomModel.create( input ).then( (model) => {
          resolve(model.formatRoom());
        });
      });
  }
};

module.exports = update_room_mutation;
