const config = require('./server/config')

module.exports = {
  client: 'pg',
  connection: config.dbString,
  migrations: {
    directory: './migrations'
  },
  seeds: { directory: './seeds' }
}
