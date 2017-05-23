import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql';
import Event from './event.js';

export default new GraphQLObjectType({
  name: 'Room',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    calendar: {
      type: GraphQLString
    },
    events: {
        type: new GraphQLList(Event),
        resolve(room, params, req) {
            if( req.isAuthenticated() ) {
              return new Promise((resolve, reject) => {
                  req.user.getCalendar(room.calendar).then( (data) => {
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
