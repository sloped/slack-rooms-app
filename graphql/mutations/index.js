import {GraphQLObjectType} from 'graphql';
import UpdateRoom from './update_room.js';
import CreateRoom from './create_room.js';
import DeleteRoom from './delete_room.js';

var Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Data update methods',
  fields: () => ({
    UpdateRoom,
    CreateRoom,
    DeleteRoom
  }),
});

module.exports = Mutation;
