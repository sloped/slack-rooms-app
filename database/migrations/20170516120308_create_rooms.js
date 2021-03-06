
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rooms', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('created_at').notNull();
      t.dateTime('updated_at').nullable();
      t.dateTime('deleted_at').nullable();
      t.string('name').notNull();
      t.string('gid').notNull();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rooms');
};
