const PaymentsHubApi = require('../integrations/paymentshub')
const db = require('../db')

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
      for (const i in members) {
        const results = await db
          .from('members')
          .select()
          .where({
            src_id: members[i].id
          })
        if (!results.length) {
          // insert new record
          console.log(`adding ${members[i].id}`)
          return db('members')
            .insert({
              first_name: members[i].first_name,
              last_name: members[i].last_name,
              src_id: members[i].id,
              email: JSON.stringify(members[i].email_addresses),
              phone: members[i].phone_number
            })
        }
      }
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
