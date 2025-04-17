/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("chat_members", (table) => {
		table.increments("id").primary();
		table.integer("chat_id");
		table.foreign("chat_id").references("users.id").onDelete("CASCADE");
		table.integer("user_id");
		table.foreign("user_id").references("users.id").onDelete("CASCADE");
		table.boolean("read").defaultTo(false);
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("chat_members", (table) => {
			table.dropForeign("chat_id");
			table.dropForeign("user_id");
		})
		.then(function () {
			return knex.schema.dropTableIfExists("chat_members");
		});
};
