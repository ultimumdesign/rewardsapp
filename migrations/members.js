exports.up = function (knex, Promise) {
  return knex.schema.createTable('members', function (table) {
    table.increments()
    table.string('email')
    table.string('first_name')
    table.string('last_name')
    table.string('updated_by')
    table.string('src_id')
    table.text('phone')
    table.bigint('points')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('members')
}
