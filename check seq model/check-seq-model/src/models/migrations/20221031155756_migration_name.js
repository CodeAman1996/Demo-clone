/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tenantcommon', function (table) {
        table.increments('id').primary()
        table.uuid('uuid').primary()
        table.string('db_Name').notNullable()
        table.string('db_host').notNullable()
        table.string('db_username').notNullable()
        table.string('db_password')
        table.string('db_port')
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('newuser')
};
