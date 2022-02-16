const PaymentsHubApi = require('../integrations/paymentshub')
const db = require('../db')

module.exports = {
  id: 'task-process-paymentshub-rewards',
  tickInterval: 120,
  totalRuns: 0,
  async callback (task) {
    // code to be executed on each run
    console.log(`${task.id} task has run ${task.currentRuns} times.`)
    const api = new PaymentsHubApi()
    try {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)
      const startDayIso = yesterday.toJSON().slice(0, 10)
      const endDayIso = today.toJSON().slice(0, 10)

      const transactions = await api.getTransactions({ start: startDayIso, end: endDayIso })

      const transactionsFiltered = transactions.filter(trans => {
        return !!trans.customer_id
      })

      for (const i in transactionsFiltered) {
        const results = await db
          .from('reward_actions')
          .select()
          .where({
            action_id: transactions[i].uniq_id
          })
        if (!results.length) {
          const currentCustomer = await db
            .from('members')
            .select()
            .where({ src_id: transactions[i].customer_id })
          if (currentCustomer[0].phone_number || currentCustomer[0].email_addresses.length) {
            const rules = await db
              .from('rewards_catalog')
              .select()
              .where({
                type: 'rule'
              })
            const ruleCalc = rules.reduce((prev, curr) => {
              const ruleAssessment = transactions[i][curr.rule_field] >= curr.rule_assertion_value
              if (ruleAssessment) {
                prev.points_awarded += Math.round(transactions[i][curr.rule_field] / curr.rule_assertion_value * curr.points_required)
              } else prev.pass = false
              return prev
            }, { pass: true, points_awarded: 0 })
            // insert new record
            if (ruleCalc.pass) {
              await db('members')
                .where({ src_id: transactions[i].customer_id })
                .update({ points: ruleCalc.points_awarded })
              await db('reward_actions')
                .insert({
                  action_id: transactions[i].uniq_id,
                  updated_by: 'sys',
                  members_src_id: transactions[i].customer_id,
                  points_adjusted: ruleCalc.points_awarded
                })
            }
          }
        }
      }
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
