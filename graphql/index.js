import graphqlHTTP from 'express-graphql';
import Schema from './rootquery.js';
import formatError from './handle_error.js';

module.exports = graphqlHTTP({
  schema: Schema,
  graphiql: process.env.NODE_ENV === 'production' ? false : true,
  formatError
});
