require('make-promises-safe')

const path = require('path')

const config = require('./config')

const members = require('./api/v1/members')

const taskRunner = require('./runner')

// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-static'), {
  root: path.resolve(__dirname, '../', 'build')
})

fastify.register(require('fastify-auth0-verify'), {
  audience: config.authprovider.api_audience,
  domain: config.authprovider.domain,
  secret: config.authprovider.secret
})

fastify.register(members, { prefix: '/api/v1' })

fastify.get('/', async (request, reply) => {
  if (config.env === 'production' && request.headers['x-forwarded-proto'] !== 'https') {
    reply.redirect(`https://${request.hostname}${request.url}`)
  } else { reply.sendFile('index.html') }
})

const start = async () => {
  try {
    taskRunner.start()
    await fastify.listen(process.env.PORT, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
