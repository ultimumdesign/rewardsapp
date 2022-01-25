require('make-promises-safe')
const path = require('path')

const httpsRedirect = require('fastify-https-redirect')

// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.register(httpsRedirect)

fastify.register(require('fastify-static'), {
  root: path.resolve(__dirname, '../', 'build')
})

fastify.get('/', async (request, reply) => {
  reply.sendFile('index.html')
})

const start = async () => {
  try {
    const port = process.env.PORT
    await fastify.listen(port, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
