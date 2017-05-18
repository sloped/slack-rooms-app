import request from 'request';
import slash_rooms from './slash-rooms.js';
import room_command from './room-command.js';

const slack_handler = function(req, res) {
    console.info('Receive Hook');
    let body = req.body;

    if( req.body.payload ) {
        body = JSON.parse(req.body.payload);
    }

    let response_url = body.response_url;
    let response_token = body.token;

    if( check_token(body) ) {
        check_action(body);
    } 
    else {
        console.error('invalid');
    }

    function check_token() {
        return response_token = process.env.SLACK_VERIFICATION_TOKEN;
    }

    function check_action(body) {
        if( body.command === '/rooms') {
            res.send();
            slash_rooms(body, respond);
        }
        else if( body.callback_id === 'room_check') {
            room_command(body, respond);
        }
        else {
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