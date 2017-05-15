import moment from 'moment';
const current_room = current_room`*Current Event:* ${summary} (${email})
Ends in ${moment(end,  'YYYY-MM-DDTHH:mm:ssZZ').fromNow(true)} (${moment(next.end.dateTime,  'YYYY-MM-DDTHH:mm:ssZZ').format('MM/DD h:mm:a')})`;
module.exports = {current_room};