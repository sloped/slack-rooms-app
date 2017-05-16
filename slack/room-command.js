import request from 'request';
import moment from 'moment';
import {available_rooms, room_status, list_rooms} from '../calendar/room_checks.js';


let room_command = function(body, respond) {
    let now = moment();
    room_status(body.actions[0].value).then( (data) => {
        if( data !== null ) {
            let current_response = '';
            let next_response = '';
            let current = find_current_event(data);
            let next = find_next_event(data);
            if( typeof current === 'object' ) {
                current_response = `*Current Event:* ${current.summary} (${current.creator.email})
Ends in ${moment(current.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ').fromNow(true)} (${moment(next.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ').format('MM/DD h:mm:a')})`;
            }
            if( typeof next === 'object' ) {
                next_response = 
                    `*Next Event:* ${next.summary} (${next.creator.email})
Starts in ${moment(next.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ').fromNow(true)}(${moment(next.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ').format('MM/DD h:mm:a')})`;
            }
            respond({
                text: `Conference Room *${body.actions[0].value}* 
${current_response}
${next_response}`
            })

        }
    });

    function find_current_event(data) {
        return data.find( (event) => {
            return now.isBetween(moment(event.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'), moment(event.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'));
        });
    }
    function find_next_event(data) {
        return data.find( (event) => {
            return now.isBefore(moment(event.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'));
        });
    }

}

module.exports = room_command;