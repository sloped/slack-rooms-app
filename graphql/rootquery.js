import { GraphQLSchema } from 'graphql';
import query from './queries';
import mutation from './mutations';

const Schema = new GraphQLSchema({
  query,
  mutation
});


module.exports = Schema;
