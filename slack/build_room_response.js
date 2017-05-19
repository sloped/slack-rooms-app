import {available_rooms, room_status, list_rooms} from '../calendar/room_checks.js';
import moment from 'moment';

module.exports = function(data, room_name) {
    let now = moment();
    let current = find_current_event(data);
    let next = find_next_event(data);
    let text = '';
    let attachments = [];
    let response = '';
    if( typeof current === 'object' ) {
        text = `:redflag: *Occupied* 
*${room_name}* is Occupied`
        attachments.push( {
            "title" : "Current Meeting",
            "title_link" : current.htmlLink,
            "color" : "cc0000",
            "fields" : [
                {
                    "title" : "Title",
                    "value" : current.summary || "Private Meeting"
                },
                {
                    "title" : "Organizer",
                    "value" : current.organizer.name || current.organizer.email || "Unknown"
                },
                {
                    "title" : "Ends In",
                    "value" : convert_date(current.end.dateTime).from()
                }
            ]
        })
    }
    else {
        text = `:check: *Available* 
*${room_name}* is Available`
    }
    if( typeof next === 'object' ) {
       attachments.push( {
            "title" : "Next Meeting",
            "title_link" : next.htmlLink,
            "color" : "FFCC00",
            "fields" : [
                {
                    "title" : "Title",
                    "value" : next.summary || "Private Meeting"
                },
                {
                    "title" : "Organizer",
                    "value" : next.organizer.name || next.organizer.email || "Unknown"
                },
                {
                    "title" : "Starts In",
                    "value" : convert_date(next.start.dateTime).from()
                }
            ]
        })
    }
    response = {text: text};

    if( attachments.length) {
        response.attachments = attachments;
    }
    return response;

    function convert_date(data) {
        return moment(data, 'YYYY-MM-DDTHH:mm:ssZZ');
    }

    function find_current_event(data) {
        return data.find( (event) => {
            return now.isBetween(convert_date(event.start.dateTime), convert_date(event.end.dateTime));
        });
    }
    function find_next_event(data) {
        return data.find( (event) => {
            return now.isBefore(convert_date(event.start.dateTime));
        });
    }
}