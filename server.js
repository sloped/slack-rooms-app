import app from './config/app.js';
import graphqlHTTP from 'express-graphql';
import Schema from './graphql/rootquery.js';
import env from 'node-env-file';

import slack_handler from './slack/handler.js';

env('.env');



app.use('/graphql', graphqlHTTP({ schema: Schema , graphiql:true, formatError: error => ({
  message: error.message,
  locations: error.locations,
  stack: error.stack,
  path: error.path
})}));



app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.post('/slack', slack_handler);

app.listen(3000, () => {
  console.log({ running: true });
});


console.log({ starting: true });