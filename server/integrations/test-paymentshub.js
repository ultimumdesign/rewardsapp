const PaymentsHubApi = require('./paymentshub')

async function run () {
  const api = new PaymentsHubApi()
  console.log(api)
  const members = await api.getMembers()
  for (const i in members) {
    console.log(members[i])
  }
}

run()
