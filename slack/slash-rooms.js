import request from 'request';
import {available_rooms, list_rooms} from '../calendar/room_checks.js';

const slash_rooms = function(body) {
    const response_url  = body.response_url;
    if( body.text === 'help' ) {
        respond({
            "text" : `
*The following commands are available:*
\`[check]\` - This will present a prompt for all known rooms. You may select one and it will return any currently occuring meetings and the next meeting scheduled. 
\`[available]\` - This will check all rooms and return a list of those that are available at this time.  
`,
        })
    } 
    else if( body.text === 'check' ) {
        list_rooms().then( (rooms)=> {
            let response = rooms.reduce( (string, current) => {
                return string + ' ' + current.name;
            }, '')
            let actions = rooms.map( (current) => {
                return {
                    name: 'room',
                    text: current.name,
                    type: 'button',
                    value: current.name
                }
            })
            respond({
                "text" : "You can check the following rooms" + response,
                "attachments" : [
                   { "text" : "Which room do you wish to check?",
                   "fallback" : "Sorry, no rooms to check",
                   "callback_id" : "room_check",
                   "attachment_type" : "default",
                   actions
                   }
                ]
            });
        })
    } 
    else if ( body.text === 'available') {
        available_rooms().then( (rooms) => {
            if( rooms.length ) {
                rooms = rooms.reduce( (acc, room, index, arr) => {
                        if( index + 1 === arr.length ) {
                            return acc + 'and ' + room;
                        }
                        else {
                             return acc + room + ', ';
                        }

                    }, '');
                respond( {
                    text: `${ rooms } are available`
                })
            }
            else {
                respond( {
                    text: `There are no room currently available`
                })
            } 
        })
    }
    else {
        respond({
            "text" : `You can get [help], check a room's status [check], or find an available room [available]`
        })
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
}

module.exports = slash_rooms;
