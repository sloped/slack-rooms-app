import get_calendar from './methods/get_calendar.js';
module.exports = {
    tableName: 'users',
    getCalendar: get_calendar,
    encryptedColumns: ['google_access_token', 'google_refresh_token', 'googleId'],

};
