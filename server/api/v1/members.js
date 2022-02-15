module.exports = function (fastify, _opts, done) {
  fastify.get('/members', {
    async handler (request, reply) {
      if (request.user.permissions.includes('read:members')) {
        try {
          const data = await fastify.db
            .from('members')
            .select()
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
