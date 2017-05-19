import build_room_response from './build_room_response';
import {room_status} from '../calendar/room_checks.js';

let room_command = function(body, respond) {
    let room = body.actions.find((action) => {
            return action.name === 'room_list'
        }).selected_options[0].value;

    room_status(room).then( (data) => {

        
        if( data !== null ) {
            respond(build_room_response(data, room));
        }
        else {
            respond({text: `:check: *Available* 
*${room}* is Available and has no upcoming events`
            })
        }
    });

}

module.exports = room_command;