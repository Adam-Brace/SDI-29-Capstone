/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("chat_members").del();
	await knex("chat_members").insert([
		{
			chat_id: 1,
			user_id: 1,
		},
		{
			chat_id: 1,
			user_id: 2,
		},
		{
			chat_id: 2,
			user_id: 2,
		},
		{
			chat_id: 3,
			user_id: 3,
		},
	]);
};
