const knex = require('knex')

const knexfile = require('../knexfile')

const configOptions = knexfile

module.exports = knex(configOptions)
