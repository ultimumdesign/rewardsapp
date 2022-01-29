const axios = require('axios')
const querystring = require('querystring')

const config = require('../config')

class PaymentsHubApi {
  constructor () {
    this.accountId = config.ph.accountId
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
          username: config.ph.username,
          password: config.ph.password
        })
      )
      this.token = response.data.token
    } catch (e) {
      return e
    }
  }

  async getMembers (params = {}) {
    if (!this.token) await this.login()
    try {
      const response = await this.axios.get(`/api/users/accounts/${this.accountId}/customers`,
        {
          headers: {
            Authorization: `Bear ${this.token}`
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
    if (!this.token) this.login()
    try {
      const response = await this.axios.get(`/api/users/accounts/${this.accountId}/transactions`,
        {
          headers: {
            Authorization: `Bear ${this.token}`
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
