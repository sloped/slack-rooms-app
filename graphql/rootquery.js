import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';

import db from '../database/main.js';
import Room from './types/room.js';
import Event from './types/event.js';
import getCalendar from '../calendar/get_calendar.js';

const RootQuery = new GraphQLObjectType({
  name: 'getRooms',
  description: 'Room Operations',
  fields: {
    rooms: {
      type: new GraphQLList(Room),
      args: {},
      resolve(root, params, options, ast) {
        return new Promise( (resolve, reject) => {
            db.all('SELECT name, gid as calendar FROM rooms', function (err, row) {
              resolve( row );
            })
        })
      }
    },
    room: {
      type: Room,
      args: {
          name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve(root, params, options, ast) {
        return new Promise( (resolve, reject) => {
            db.get('SELECT name, gid as calendar FROM rooms WHERE name = "' + params.name + '"', function (err, row) {
              resolve( row );
            })
        })
      }
    },
    events: {
      type: new GraphQLList(Event),
      args: {
          name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve(root, params, options, ast) {
        return new Promise( (resolve, reject) => {
            db.get('SELECT name, gid as calendar FROM rooms WHERE name = "' + params.name + '"', function (err, row) {
              getCalendar(row.calendar).then( (data) => {
                  resolve(data.map((event) => {
                      return {
                          name: event.summary,
                          description: event.description,
                          startTime: event.start.dateTime,
                          creator: event.creator,
                          endTime: event.end.dateTime,
                          attendees: event.attendees
                      }
                  }))
              });
            })
        })
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: RootQuery
});

// db.each('SELECT name, gid FROM rooms where name="Feisty"', function (err, row) {
//     console.log(row.name, row.gid)
//     getCalendar(row.gid);
//   })
module.exports = Schema;