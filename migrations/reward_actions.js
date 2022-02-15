exports.up = function (knex, Promise) {
  return knex.schema.createTable('reward_actions', function (table) {
    table.string('action_id').index().notNullable()
    table.timestamps(true, true)
    table.string('updated_by')
    table.text('members_src_id')
    table.bigint('points_adjusted')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('reward_actions')
}
