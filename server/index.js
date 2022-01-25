require('make-promises-safe')
const path = require('path')

const httpsRedirect = require('fastify-https-redirect')

// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-static'), {
  root: path.resolve(__dirname, '../', 'build')
})

fastify.get('/', async (request, reply) => {
  reply.sendFile('index.html')
})

fastify.register(httpsRedirect, { httpPort: process.env.PORT })
