// routes/v1/users.js
module.exports = function (fastify, _opts, done) {
  fastify.get('/members', {
    handler: function (request, reply) {
      if (request.user.permissions.includes('read:members')) { reply.send(request.user) }
    },
    preValidation: fastify.authenticate
  })
  done()
}
