
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rooms').del()
    .then(function () {
      // Inserts seed entries
      return knex('rooms').insert([
        {
          name: 'Feisty', 
          gid: 'clockwork.net_2d3831353837323433393633@resource.calendar.google.com',
          created_at: knex.fn.now()
        },
        {
          name: 'Green', 
          gid: 'clockwork.net_2d3438323538303639383430@resource.calendar.google.com',
          created_at: knex.fn.now()
        },
        {
          name: 'Gears', 
          gid: 'clockwork.net_2d3233333231373434343232@resource.calendar.google.com',
          created_at: knex.fn.now()
        },
        {
          name: 'Large', 
          gid: 'clockwork.net_2d3933363839303839363836@resource.calendar.google.com',
          created_at: knex.fn.now()
        },
        {
          name: 'Small', 
          gid: 'clockwork.net_37383832313939353132@resource.calendar.google.com',
          created_at: knex.fn.now()
        },
        {
          name: 'Flex', 
          gid: 'clockwork.net_36343431333030322d363432@resource.calendar.google.com',
          created_at: knex.fn.now()
        }
      ]);
    });
};