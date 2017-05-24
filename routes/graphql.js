import graphqlHTTP from 'express-graphql';
import {track} from './middleware';
import Schema from '../graphql/rootquery.js';
import formatError from '../graphql/handle_error.js';
module.exports = function(app) {
    app.use('/graphql', track,  graphqlHTTP({ schema: Schema , graphiql:true, formatError}));
};
