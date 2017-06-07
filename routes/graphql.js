import graphqlHTTP from '../graphql';
import {track} from './middleware';
module.exports = function(app) {
    app.use('/graphql', track,  graphqlHTTP);
};
