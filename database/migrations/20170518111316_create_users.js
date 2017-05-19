
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').nullable();
      t.dateTime('deleted_at').nullable();
      t.string('name').nullable();
      t.string('googleId').notNull();
      t.string('google_access_token').nullable();
      t.string('google_refresh_token').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
