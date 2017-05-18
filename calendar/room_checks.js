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
    return new Promise( (resolve, reject ) =>  {
        Rooms.forge().fetch().then( (collection) => {
            var promises = [];
            var rooms = [];
            collection.models.forEach( ({attributes}) => {
                let promise = getCalendar(attributes.gid, new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString())
                promise.then( (events) => {
                    events.forEach((ev) => {
                        if( moment().isBetween(moment(ev.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'), moment(ev.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ')) ) {
                            rooms.splice( rooms.findIndex( ( r ) => {
                                return r === attributes; 
                            }), 1 );
                        }
                    })
                    return true;
                } )
                promises.push(promise);
                rooms.push(attributes.name);
            })
            Promise.all(promises).then( ()=> {
                resolve(rooms);
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

module.exports = {available_rooms, room_status, list_rooms};