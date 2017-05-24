
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {
          name: 'Name',
          gid: 'id@resource.calendar.google.com',
          created_at: knex.fn.now()
        }
      ]);
    });
};
