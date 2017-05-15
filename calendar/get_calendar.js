
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var client = null;
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/storage/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';

authorize(JSON.parse(fs.readFileSync('storage/client_secrets.json')));
module.exports = getCalendar;
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  oauth2Client.credentials = JSON.parse(fs.readFileSync(TOKEN_PATH));
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