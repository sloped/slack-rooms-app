import moment from 'moment';
import getCalendar from './get_calendar.js';
import {Room, Rooms} from '../database';

const list_rooms = function() {
    return new Promise( (resolve, reject ) =>  {
        Rooms.forge().fetch().then( (collection) => {
          resolve(collection.models.map( ({attributes}) => {
            return {
              name: attributes.name
            }
          }));
        });
    }); 
   
}
const available_rooms = function() {
    let promises = [];
    return new Promise( (resolve, reject ) =>  {
        Rooms.forge().fetch().then( (collection) => {
            collection.models.forEach( ({attributes}) => {
                let promise = new Promise( (resolve, reject) => {
                    getCalendar(attributes.gid, new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()).then( (data) => {
                        resolve( {
                            name: attributes.name,
                            events: data
                        });
                    });
                });
                promises.push(promise);
            });
                
            Promise.all(promises).then( (data)=> {
                var response = data.filter( (room) => {
                    if( room.events === null ) {
                        return true;
                    }
                    var current = room.events.findIndex( (event) => {
                        return moment().isBetween(moment(event.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'), moment(event.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'))
                    }) === -1; 
                    return current;
                }).map( (room) => {
                    return room.name;
                })
                
                resolve(response);
            });
        })
    }); 
}

const room_status = function(room) {
    return new Promise( (resolve, reject) => {
        new Room( {'name' : room}).fetch().then( ( model ) => {
            getCalendar(model.get('gid')).then( (data) => {
                resolve(data)
            });
        });
    });
    
}
function current_event(event) {
    return moment().isBetween(moment(event.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'), moment(event.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'))
}

module.exports = {available_rooms, room_status, list_rooms};