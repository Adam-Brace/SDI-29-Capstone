/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("events", (table) => {
		table.increments("id").primary();
		table.integer("user_id");
		table.foreign("user_id").references("users.id").onDelete("CASCADE");
		table.integer("chat_id");
		table.foreign("chat_id").references("chats.id").onDelete("CASCADE");
		table.datetime("start_date").notNullable();
		table.datetime("end_date").notNullable();
		table.string("title").notNullable();
		table.string("description");
		table.string("color");
		table.string("status").defaultTo("pending");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.alterTable("events", (table) => {
			table.dropForeign("user_id");
			table.dropForeign("chat_id");
		})
		.then(function () {
			return knex.schema.dropTableIfExists("events");
		});
};
