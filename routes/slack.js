import slack_handler from '../slack/';

module.exports = function(app) {
    app.post('/slack', slack_handler);
}
