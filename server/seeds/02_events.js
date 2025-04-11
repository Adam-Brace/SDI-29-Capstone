/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("events").del();
	await knex("events").insert([
		{
			user_id: 1,
			chat_id: 1,
			start_date: new Date("2025-04-9 08:00:00"),
			end_date: new Date("2025-04-9 09:00:00"),
			title: "Event 1",
			description: "Description 1",
			color: "#FF0000",
			status: "approved",
		},
		{
			user_id: 1,
			chat_id: 2,
			start_date: new Date("2025-04-9 08:00:00"),
			end_date: new Date("2025-04-9 09:00:00"),
			title: "Event 1",
			description: "Description 1",
			color: "#FF0000",
			status: "denied",
		},
		{
			user_id: 3,
			chat_id: 3,
			start_date: new Date("2025-04-9 08:00:00"),
			end_date: new Date("2025-04-9 09:00:00"),
			title: "Event 1",
			description: "Description 1",
			color: "#FF0000",
			status: "pending",
		},
		{
			user_id: 4,
			chat_id: 4,
			start_date: new Date("2025-04-9 08:00:00"),
			end_date: new Date("2025-04-9 09:00:00"),
			title: "Event 1",
			description: "Description 1",
			color: "#FF0000",
			status: "pending",
		},
	]);
};
