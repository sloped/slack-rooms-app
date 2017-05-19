var google = require('googleapis');
var googleAuth = require('google-auth-library');
var client = null;

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
    "access_token":credentials.access_token,
    "refresh_token":credentials.refresh_token,
    "token_type":"Bearer"
  }
  client = oauth2Client;
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getCalendar(cal_id, maxTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()) {
    authorize( { 
      access_token : this.get('google_access_token'),
      refresh_token: this.get('google_refresh_token') }
    );
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
            console.error('We Encountered an error. ', err);

            resolve(null);
            return;
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