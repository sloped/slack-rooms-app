import { GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql';
import Event from '../types/event.js';
import getCalendar from '../../calendar/get_calendar.js';
import {Room} from '../../database/main.js';

const events = {
      type: new GraphQLList(Event),
      args: {
          name: {
            name: 'name',
            type: new GraphQLNonNull(GraphQLString)
          }
      },
      resolve(root, params, options, ast) {
        return new Promise( (resolve, reject) => {
            new Room( {'name' : params.name}).fetch().then( ( model ) => {
                getCalendar(model.get('gid')).then( (data) => {
                    if( data === null ) {
                        resolve([]);
                    }
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
    };

module.exports = events;