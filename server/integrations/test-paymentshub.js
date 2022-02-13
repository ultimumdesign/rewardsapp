const PaymentsHubApi = require('./paymentshub')

async function run () {
  const api = new PaymentsHubApi()
  console.log(api)
  const members = await api.getMembers()
  console.log(members)
}

run()
