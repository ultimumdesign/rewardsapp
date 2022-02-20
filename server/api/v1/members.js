const db = require('../../db')

module.exports = function (fastify, _opts, done) {
  fastify.get('/members', {
    async handler (request, reply) {
      if (request.user.permissions.includes('read:members')) {
        try {
          const data = await db
            .from('members')
            .whereNotNull('phone')
            .orWhereNot('phone', '')
            .orWhereNot('email', '')
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
