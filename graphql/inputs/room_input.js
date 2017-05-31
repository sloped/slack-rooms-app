import {
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';
import building from '../types/building.js';
const room_input = new GraphQLInputObjectType({
  name: 'RoomInput',
  fields: {
    name: { type: GraphQLString },
    calendar: { type: GraphQLString },
    building: {type: building}
  }
  });

module.exports = room_input;
