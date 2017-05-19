
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(t) {
      t.increments('id').unsigned().primary();
      t.string('sid').notNull().unique();
      t.string('data').nullable();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions');
};
