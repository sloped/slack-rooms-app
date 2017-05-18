import graphqlHTTP from 'express-graphql';
import Schema from '../graphql/rootquery.js';

module.exports = function(app) {
    app.use('/graphql', graphqlHTTP({ schema: Schema , graphiql:true, formatError: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack,
      path: error.path
    })}));
}