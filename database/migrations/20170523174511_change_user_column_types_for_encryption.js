
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
     t.string('googleId').changeTo('text');
     t.string('google_access_token').changeTo('text');
     t.string('google_refresh_token').changeTo('text');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (t) {
     t.string('googleId').changeTo('string');
     t.string('google_access_token').changeTo('string');
     t.string('google_refresh_token').changeTo('string');
  });
};
