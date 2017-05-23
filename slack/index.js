import request from 'request';
import slash_rooms from './slash-rooms.js';
import room_command from './room-command.js';
import tracking from '../config/analytics.js';
const slack_handler = function(req, res) {

    let body = req.body;

    if( req.body.payload ) {
        body = JSON.parse(req.body.payload);
    }

    let response_url = body.response_url;

    if( check_token(body.token) ) {
        check_action(body);
    }
    else {
        console.error('invalid');
    }

    function check_token(token) {
        return token === process.env.SLACK_VERIFICATION_TOKEN;
    }

    function check_action(body) {

        if( body.command === process.env.SLACK_ROOMS_COMMAND) {
            res.send();
            tracking.track_event('Slack', 'slash_command', process.env.SLACK_ROOMS_COMMAND);
            slash_rooms(body, respond);
        }
        else if( body.callback_id === 'room_check') {
            tracking.track_event('Slack', 'room_check');
            let room = body.actions.find((action) => {
                return action.name === 'room_list'
            }).selected_options[0].value;
            res.send();
            room_command(room, respond);
        }
        else {
            tracking.track_event('Slack', 'unknown');
            console.error('unknown command');
        }
    }

    function respond(data, in_channel = false) {
        if( in_channel) {
            data = Object.assign(data, {"response_type": "in_channel"});
        }
        return request.post({
                uri: response_url,
                json: true,
                body: data
            }, (err, httpResponse, body) => {
                //console.log(err, httpResponse, body);
            });
    }
};



module.exports = slack_handler;
