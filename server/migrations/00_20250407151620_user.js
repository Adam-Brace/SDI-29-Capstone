const { TableBuilder } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("password").unique();
		table.string("first_name");
		table.string("last_name");
		table.string("rank");
		table.string("email");
		table.string("phone");
		table.string("organization");
		table.string("crew");
		table.string("position");
		table.string("permissions");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists("users");
};
