
exports.up = function(knex, Promise) {
  if(knex.client.config.client === 'sqlite3') {
    return Promise.resolve();
  }
  return knex.schema.alterTable('users', function (t) {
     t.text('googleId').alter();
     t.text('google_access_token').alter();
     t.text('google_refresh_token').alter();
  });
};

exports.down = function(knex, Promise) {
  if(knex.client.config.client === 'sqlite3') {
    return Promise.resolve();
  }
  return knex.schema.alterTable('users', function (t) {
     t.string('googleId').alter();
     t.string('google_access_token').alter();
     t.string('google_refresh_token').alter();
  });
};
