import get_calendar from './methods/get_calendar.js';
import is_admin from './methods/is_admin.js';
module.exports = {
    tableName: 'users',
    getCalendar: get_calendar,
    is_admin,
    encryptedColumns: ['google_access_token', 'google_refresh_token', 'googleId'],

};
