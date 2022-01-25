// routes/v1/users.js
module.exports = function (fastify, _opts, done) {
  fastify.get('/members', {
    handler: function (request, reply) {
      if (request.user.permissions.includes['read:members']) {
        fastify.log.info('MEMBERS ONLY')
        reply.send({ name: 'hello' })
      } else reply.send({ error: '' })
    },
    preValidation: fastify.authenticate
  })
  done()
}