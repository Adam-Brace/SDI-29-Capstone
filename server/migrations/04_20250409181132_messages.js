/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("messages", (table) => {
		table.increments("id").primary();
		table.integer("chat_id");
		table.foreign("chat_id").references("users.id").onDelete("CASCADE");
		table.integer("sender_id");
		table.foreign("sender_id").references("users.id").onDelete("CASCADE");
		table.string("content");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("messages", (table) => {
			table.dropForeign("chat_id");
			table.dropForeign("sender_id");
		})
		.then(function () {
			return knex.schema.dropTableIfExists("messages");
		});
};
