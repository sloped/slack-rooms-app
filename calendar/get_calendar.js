
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var client = null;
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = 'storage/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

authorize();
module.exports = getCalendar;
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  var clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  var clientId = process.env.GOOGLE_CLIENT_ID;
  var redirectUrl = process.env.GOOGLE_REDIRECT_URL;
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  oauth2Client.credentials = {
    "access_token":process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
    "refresh_token":process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
    "token_type":"Bearer",
    "expiry_date":process.env.GOOGLE_OAUTH_EXPIRY};
  client = oauth2Client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getCalendar(cal_id, maxTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()) {

    return new Promise( (resolve, reject) => {
      var calendar = google.calendar('v3');
        calendar.events.list({
          auth: client,
          calendarId: cal_id,
          timeMin: (new Date()).toISOString(),
          timeMax: maxTime,
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime'
        }, function(err, response) {
          if (err) {
            reject('The API returned an error: ' + err);
          }
          var events = response.items;
          if (events.length == 0) {
            resolve(null);
          } else {
            resolve(events);
          }
        });
      });
}