module.exports = function (fastify, _opts, done) {
  fastify.get('/members', {
    handler (request, reply) {
      if (request.user.permissions.includes('read:members')) {
        try {
          const data = [{ first_name: 'test', last_name: 'user', points: 0 }]
          reply.send(data)
        } catch (e) {
          console.error(e)
        }
      }
    },
    preValidation: fastify.authenticate
  })
  done()
}
