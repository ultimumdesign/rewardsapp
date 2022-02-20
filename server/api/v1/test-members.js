const db = require('../../db')

async function run () {
  const data = await db
    .from('members')
    .whereNotNull('phone')
    .orWhereNot('phone', '')
    .orWhereNot('email', '')
  console.log(data)
}
run()
