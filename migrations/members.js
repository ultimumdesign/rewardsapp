exports.up = function (knex, Promise) {
  return knex.schema.createTable('members', function (table) {
    table.increments()
    table.timestamps(true, true)
    table.text('email')
    table.string('first_name')
    table.string('last_name')
    table.string('updated_by')
    table.string('src_id')
    table.text('phone')
    table.bigint('points').defaultTo(0)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('members')
}
