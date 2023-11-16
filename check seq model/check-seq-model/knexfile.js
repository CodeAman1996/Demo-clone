// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const pkg = require('./package.json')
const path = require('path')
//const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      user: "root",
      host: "localhost",
      port: "3306",
      database: "common_db2",
      password: "root"
    },
    migrations: {
      directory: path.join(__dirname, './src/models/migrations'),
    }
  },
  // production: {
  //   client: 'mysql',
  //   connection: {
  //     user: "root",
  //     host: "localhost",
  //     port: "3306",
  //     database: "common_db2",
  //     password: "root"
  //   },
  //   pool: { min: 2, max: 10 },
  //   migrations: {
  //     directory: path.join(__dirname, './src/models/migrations'),
  //   }
  // }
}
