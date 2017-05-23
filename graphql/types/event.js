import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import dateType from '../scalar-types/dateType.js';

export default new GraphQLObjectType({
  name: 'Event',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    roomId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
        type: GraphQLString
    },
    startTime: {
      type: dateType
    },
    endTime: {
      type: dateType
    },
    creator: {
        type: GraphQLString,
        resolve(event) {
            return getCreator(event);
        }
    },
    attendees: {
        type: new GraphQLList(GraphQLString),
        resolve(event) {

            if( event.attendees ) {
                return  event.attendees.map( (attendee) => {
                    if( attendee.email.search(/\@clockwork\.(com|net)/) > -1 ) {
                       if( attendee.displayName) {
                        return attendee.displayName;
                       }
                       else {
                           return attendee.email;
                       }

                    }
                    else {
                        return false;
                    }
                }).filter( (element) => {
                    return element;
                });
            }
            else {
                return [];
            }
        }
    }
  }
});

function getCreator(event) {
    if( event.creator ) {
        if( event.creator.displayName) {
            return event.creator.displayName;
        }
        return event.creator.email.replace(/\@clockwork\.(com|net)/, '');
    }
    else {
        return 'Creator Not Known';
    }
}
