
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rooms', function(t) {
      t.increments('id').unsigned().primary();
      t.dateTime('createdAt').notNull();
      t.dateTime('updatedAt').nullable();
      t.dateTime('deletedAt').nullable();
      t.string('name').notNull();
      t.string('gid').notNull();
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};
