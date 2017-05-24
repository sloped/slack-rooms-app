import {
  GraphQLString,
  GraphQLInputObjectType
} from 'graphql';
const room_input = new GraphQLInputObjectType({
  name: 'RoomInput',
  fields: {
    name: { type: GraphQLString },
    calendar: { type: GraphQLString },
  }
  });

module.exports = room_input;
