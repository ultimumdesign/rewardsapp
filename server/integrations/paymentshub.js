const axios = require('axios')
const querystring = require('querystring')

const config = require('../config')

class PaymentsHubApi {
  constructor () {
    this.accountId = config.integrations.ph.accountId
    this.token = null
    this.axios = axios.create({
      baseURL: 'https://www.paymentshub.com',
      validateStatus: (status) => status < 500
    })
  }

  async login () {
    try {
      const response = await this.axios.post('/api/users/create-session',
        querystring.stringify({
          username: config.integrations.ph.username,
          password: config.integrations.ph.password
        })
      )
      this.token = response.data.token
    } catch (e) {
      return e
    }
  }

  async getMembers (params = {}) {
    await this.login()
    try {
      const response = await this.axios.get(`/api/users/accounts/${this.accountId}/customers`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          params
        }
      )
      return response.data
    } catch (e) {
      console.error(e)
    }
  }

  async getTransactions (params = {}) {
    this.login()
    try {
      const response = await this.axios.get(`/api/users/accounts/${this.accountId}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`
          },
          params
        }
      )
      return response.data
    } catch (e) {
      return e
    }
  }
}

module.exports = PaymentsHubApi
