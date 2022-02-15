const PaymentsHubApi = require('./paymentshub')

async function run () {
  const api = new PaymentsHubApi()
  const members = await api.getMembers()
  console.log(members)

  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1)

  const startDayIso = yesterday.toJSON().slice(0, 10)
  const endDayIso = today.toJSON().slice(0, 10)
  const trans = await api.getTransactions({ start: startDayIso, end: endDayIso })
  console.log(trans)
}

run()
