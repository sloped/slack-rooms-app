var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database/db.sqlite')

// db.serialize(function () {
//     db.run('CREATE TABLE rooms ( name TEXT, gid TEXT)')
//     var stmt = db.prepare('INSERT INTO rooms(name, gid) VALUES ($name, $gid)')

//     stmt.run({ $name: 'Feisty', $gid: 'clockwork.net_2d3831353837323433393633@resource.calendar.google.com'});
//     stmt.run({ $name: 'Green', $gid: 'clockwork.net_2d3438323538303639383430@resource.calendar.google.com'});
//     stmt.run({ $name: 'Gears', $gid: 'clockwork.net_2d3233333231373434343232@resource.calendar.google.com'});
//     stmt.run({ $name: 'Large', $gid: 'clockwork.net_2d3933363839303839363836@resource.calendar.google.com'});
//     stmt.run({ $name: 'Small', $gid: 'clockwork.net_37383832313939353132@resource.calendar.google.com'});
//     stmt.run({ $name: 'Flex', $gid: 'clockwork.net_36343431333030322d363432@resource.calendar.google.com'});

//     stmt.finalize()
// });

module.exports = db;