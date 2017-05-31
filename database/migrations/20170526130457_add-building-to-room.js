
exports.up = function(knex, Promise) {
  return knex.schema.table('rooms', function(t) {
      t.text('building').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('rooms', function(t) {
      t.dropColumn('building');
  });
};
