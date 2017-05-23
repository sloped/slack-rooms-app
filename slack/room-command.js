import build_room_response from './build_room_response';
import {room_status} from '../calendar/room_checks.js';

let room_command = function(room, respond) {


    room_status(room).then( (data) => {
        if( data !== null ) {
            respond(build_room_response(data, room));
        }
        else {
            respond({text: `:check: *Available*
*${room}* is Available and has no upcoming events`
            });
        }
    }).catch((data) => {
        respond({
            text: `Could not find a room matching *${room}*`
        });
    });

};

module.exports = room_command;
