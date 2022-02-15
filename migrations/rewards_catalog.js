exports.up = function (knex, Promise) {
  return knex.schema.createTable('rewards_catalog', function (table) {
    table.increments()
    table.timestamps(true, true)
    table.string('updated_by')
    table.text('description')
    table.bigint('points_required')
    table.text('type')
    table.string('rule_field')
    table.bigint('rule_assertion_value')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('rewards_catalog')
}
