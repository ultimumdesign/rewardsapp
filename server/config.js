require('dotenv').config()
const environments = {}

environments.production = {
  authprovider: {
    audience: process.env.AUTH_AUDIENCE,
    domain: process.env.AUTH_DOMAIN,
    secret: process.env.AUTH_SECRET,
    api_audience: process.env.AUTH_API_AUDIENCE
  },
  env: 'production',
  dbString: process.env.DATABASE_URL,
  integrations: {
    ph: {
      username: process.env.PH_USERNAME,
      password: process.env.PH_PASSWORD,
      accountId: process.env.PH_ACCOUNTID
    }
  }
}
// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check that the current environment is one of the environment defined above,
// if not default to prodution
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.production

// export the module
module.exports = environmentToExport
