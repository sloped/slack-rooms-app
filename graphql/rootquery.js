import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import rooms from './fields/rooms';
import room from './fields/room';
import events from './fields/events';

const RootQuery = new GraphQLObjectType({
  name: 'Calendar',
  description: 'Retrieves rooms and their events.',
  fields: {
    rooms,
    room,
    events
  }
});

const Schema = new GraphQLSchema({
  query: RootQuery
});


module.exports = Schema;