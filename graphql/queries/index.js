import { GraphQLObjectType } from 'graphql';
import rooms from './rooms';
import room from './room';
import events from './events';
import user from './user';

const RootQuery = new GraphQLObjectType({
  name: 'Calendar',
  description: 'Retrieves rooms and their events.',
  fields: {
    rooms,
    room,
    events,
    user
  }
});

module.exports = RootQuery;
