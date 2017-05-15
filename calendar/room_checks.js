import moment from 'moment';
import getCalendar from './get_calendar.js';
import db from '../database/main.js';

const list_rooms = function() {
    return new Promise( (resolve, reject ) =>  {
        db.all('SELECT name FROM rooms', function (err, row) {
            resolve( row );
        })
    }); 
   
}
const available_rooms = function() {
    return new Promise( (resolve, reject ) =>  {
        db.all('SELECT name, gid FROM rooms', function (err, row) {
            var promises = [];
            var rooms = [];
            row.forEach( (room) => {
                let promise = getCalendar(room.gid, new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString())
                promise.then( (events) => {
                    events.forEach((ev) => {
                        if( moment().isBetween(moment(ev.start.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ'), moment(ev.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ')) ) {
                            rooms.splice( rooms.findIndex( ( r ) => {
                                return r === room; 
                            }), 1 );
                        }
                    })
                    return true;
                } )
                promises.push(promise);
                rooms.push(room.name);
            })
            Promise.all(promises).then( ()=> {
                resolve(rooms);
            });
        })
    }); 
}

const room_status = function(room) {
    return new Promise( (resolve, reject) => {
        db.get('SELECT name, gid as calendar FROM rooms WHERE name = "' + room + '"', function (err, row) {
          getCalendar(row.calendar).then( (data) => {
              resolve(data)
          });
        })
        
    })
    
}

module.exports = {available_rooms, room_status, list_rooms};