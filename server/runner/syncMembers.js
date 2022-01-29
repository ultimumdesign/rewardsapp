const PaymentsHubApi = require('../integrations/paymentshub')
const db = require('../db')
const { default: knex } = require('knex')

module.exports = {
  id: 'task-sync-paymentshub-members',
  tickInterval: 60,
  totalRuns: 0,
  async callback (task) {
    // code to be executed on each run
    console.log(`${task.id} task has run ${task.currentRuns} times.`)
    const api = new PaymentsHubApi()
    try {
      const members = await api.getMembers()
      for (const member in members) {
        const results = await db
          .from('members')
          .select()
          .where({
            src_id: member.id
          })
        if (!results.length) {
          // insert new record
          return knex('members')
            .insert({
              first_name: member.first_name,
              last_name: member.last_name,
              src_id: member.id,
              email: JSON.stringify(member.email_addresses),
              phone: member.phone_number
            })
        }
      }
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
