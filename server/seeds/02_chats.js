/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("chats").del();
	await knex("chats").insert([
		{
			is_group: true,
			name: "Group Chat",
		},
		{
			is_group: true,
			name: "Group",
		},
		{
			is_group: true,
			name: "Admin",
		},
		{
			is_group: true,
			name: "chat",
		},
	]);
};
