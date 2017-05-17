// Update with your config settings.
var path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.dirname(__filename) + '/db.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    version: '9.6.2',
    debug:true,
    connection: process.env.DATABASE_URL + '?ssl=true',
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
