import request from 'request';
import moment from 'moment';
import {available_rooms, list_rooms} from '../calendar/room_checks.js';
import room_command from './room-command.js';

const slash_rooms = function(body, respond) {
    var regex = /check\s(\w+)/;
    var match = regex.exec(body.text);
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
                    "text": current.name,
                    "value": current.name
                }
            })
            respond({
                "text" : "Which room do you wish to check?",
                "attachments" : [
                   { "text" : "Choose a room?",
                   "fallback" : "Sorry, no rooms to check",
                   "callback_id" : "room_check",
                   "attachment_type" : "default",
                   "actions" :[ {
                       "name": "room_list",
                       "text": "Choose a room...",
                       "type": "select",
                       "options": actions
                   }]
                   }
                ]
            });
        })
    } 
    else if(  typeof match  === 'array' ) {
        
        room_command(match[1].split('').reduce( (agg, item, index) => { 
        if(index === 0) {
            return agg + item.toUpperCase(); 
        } 
            return agg+item } , ''), respond);
    }
    else if ( body.text === 'available') {
        available_rooms().then( (rooms) => {
            if( rooms.length ) {
                rooms = rooms.reduce( (acc, room, index, arr) => {
                        if( index === 0 && arr.length === 1) {
                            return acc + `*${room}*`;
                        }
                        else if ( index === 0 && arr.length > 1 ) {
                            return acc + `*${room}*`
                        }
                        else if( arr.length === 1 ) {
                            return acc + ` and *${room}*`
                        }
                        else if( index + 1 === arr.length ) {
                            return acc + ', and *' + room + '*';
                        }
                        else {
                             return acc + ', *' + room + '*';
                        }

                    }, '');
                respond( {
                    text: `:check: ${ rooms } are available`,
                    attachments: [
                        {
                            title: "Create An Event",
                            text: "Creates a 30 minute event. Please note you will need to select one of the available rooms.",
                            title_link: create_calendar_link()
                        }
                    ]
                })
            }
            else {
                respond( {
                    text: `:redflag: There are no room available`
                })
            } 
        })
    }
    else {
        respond({
            "text" : `You can get [help], check a room's status [check], or find an available room [available]`
        })
    }
}

function create_calendar_link() {
    var now = moment().utc().format('YYYYMMDD[T]HHmmss[Z]')
    var end = moment().add(30, 'm').utc().format('YYYYMMDD[T]HHmmss[Z]')
    return `http://www.google.com/calendar/event?action=TEMPLATE&dates=${now}%2F${end}&text=New%20Event&location=&details=` 
}

module.exports = slash_rooms;
