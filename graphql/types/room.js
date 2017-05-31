import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';
import Event from './event.js';
import Building from './building.js';

export default new GraphQLObjectType({
  name: 'Room',
  description: 'A room is a conference room which can be booked within Google Calendar.',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString,
      description: 'The display name of the room. This is also used for performing queries in Slack'
    },
    calendar: {
      type: GraphQLString,
      description: `The email address of the calendar for the room in gcal. Can be found by viewing the room's settings in google calendar.`
    },
    building: {
      type: Building
    },
    events: {
        type: new GraphQLList(Event),
        resolve(room, params, req) {
            if( req.isAuthenticated() ) {
              return new Promise((resolve, reject) => {
                  req.user.getCalendar(room.calendar).then( (data) => {
                      if(data === null ) {
                        resolve([]);
                        return;
                      }
                      resolve(data.map((event) => {
                          return {
                              name: event.summary,
                              description: event.description,
                              startTime: event.start.dateTime,
                              creator: event.creator,
                              endTime: event.end.dateTime,
                              attendees: event.attendees
                          };
                      }));
                  });
              });
            }
            else {
              return null;
            }

        }
    }
  }
});