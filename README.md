# Clockwork Calendar Server

A nodejs application that provides Clockworkers access to Google Calendar information regarding conference rooms. 

## Major Libraries

- Expressjs <https://expressjs.com/>
- Vuejs <https://vuejs.org/>
- Google Api Library <https://github.com/google/google-api-javascript-client>
- Passport JS <http://passportjs.org/>
- Bulma <http://bulma.io/>

## Getting it Running

Copy the `.env.example` file to `.env`. You want to generate an application key using `npm run generate:key` and copy it to the `APP_SECRET` line. 

### Slack Api

You'll need to create an app at https://api.slack.com/apps. Fill in the appropriate values in your `.env`. You'll also need to create both a Slash command for the rooms command and set a an interactive message url. Both should be `http://{your_apps_url}/slack`.

### Google API

You'll need to create a new Oauth application for Google. https://console.developers.google.com/apis. You want to generate a web application client and an other client. Use the Web Application for the `GOOGLE_*` variables and the Other client for the `SLACK_CLIENT` variables. 

Run `npm run auth-google`. Follow the steps. Copy the keys from `/storage/calendar-nodejs-quickstart.json` to the corresponding values in the `.env`. 

### Database
Run `npm run migrate` to create the necessary tables. Then `npm run seed` to insert the calendar data into the database. 

### Run

Run with `npm run dev`

### Running on Heroku

More info to come. 