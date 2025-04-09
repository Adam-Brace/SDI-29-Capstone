/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("messages").del();
	await knex("messages").insert([
		{
			chat_id: 1,
			sender_id: 1,
			content: "Hello, how are you?",
		},
		{
			chat_id: 1,
			sender_id: 2,
			content: "I am fine, thank you!",
		},
		{
			chat_id: 2,
			sender_id: 2,
			content: "What about you?",
		},
		{
			chat_id: 3,
			sender_id: 3,
			content: "Good morning!",
		},
	]);
};
