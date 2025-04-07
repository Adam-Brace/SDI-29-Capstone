/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table.foreign("user_id").references("user.id");
    // Dummy data needed
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .afterTable("events", (table) => {
      table.dropForeign("user_id");
    })
    .then(function () {
      return knex.schema.dropTableIfExists("events");
    });
};
