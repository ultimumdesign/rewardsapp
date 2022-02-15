const knex = require('knex')

const knexfile = require('../knexfile')

const fp = require('fastify-plugin')

const db = knex(knexfile)

function dbPlugin (fastify, opts, done) {
  fastify.decorate('db', db)
  done()
}

exports.dbPlugin = fp(dbPlugin)
module.exports = db
