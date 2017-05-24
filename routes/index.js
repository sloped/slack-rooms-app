import web_routes from './web.js';
import slack_routes from './slack.js';
import graphql_routes from './graphql.js';
import auth_routes from './auth.js';
import admin_routes from './admin.js';
module.exports = function(app) {
    web_routes(app);
    slack_routes(app);
    graphql_routes(app);
    auth_routes(app);
    admin_routes(app);
};
