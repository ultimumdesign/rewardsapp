require('make-promises-safe')

// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    const port = process.env.PORT || 80
    await fastify.listen(port)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
