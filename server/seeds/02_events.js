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
			start_date: new Date("2025-04-16 00:00:00"),
			end_date: new Date("2025-04-16 12:00:00"),
			title: "Panama 12's",
			description: "Work",
			color: "#4caf50",
			status: "approved",
		},
		{
			user_id: 2,
			chat_id: 2,
			start_date: new Date("2025-04-16 12:00:00"),
			end_date: new Date("2025-04-16 23:59:00"),
			title: "Panama 12's",
			description: "Work",
			color: "##4caf50",
			status: "approved",
		},
		{
			user_id: 1,
			chat_id: 1,
			start_date: new Date("2025-04-17 00:00:00"),
			end_date: new Date("2025-04-17 12:00:00"),
			title: "Panama 12's",
			description: "Work",
			color: "#4caf50",
			status: "approved",
		},
		{
			user_id: 2,
			chat_id: 2,
			start_date: new Date("2025-04-17 12:00:00"),
			end_date: new Date("2025-04-17 23:59:00"),
			title: "Panama 12's",
			description: "Work",
			color: "##4caf50",
			status: "approved",
		},
		{
			user_id: 3,
			chat_id: 3,
			start_date: new Date("2025-04-18 00:00:00"),
			end_date: new Date("2025-04-18 12:00:00"),
			title: "Panama 12's",
			description: "Work",
			color: "#4caf50",
			status: "approved",
		},
		{
			user_id: 4,
			chat_id: 4,
			start_date: new Date("2025-04-18 12:00:00"),
			end_date: new Date("2025-04-18 23:59:00"),
			title: "Panama 12's",
			description: "Work",
			color: "##4caf50",
			status: "approved",
		},
		{
			user_id: 3,
			chat_id: 3,
			start_date: new Date("2025-04-19 00:00:00"),
			end_date: new Date("2025-04-19 12:00:00"),
			title: "Panama 12's",
			description: "Work",
			color: "#4caf50",
			status: "approved",
		},
		{
			user_id: 4,
			chat_id: 4,
			start_date: new Date("2025-04-19 12:00:00"),
			end_date: new Date("2025-04-19 23:59:00"),
			title: "Panama 12's",
			description: "Work",
			color: "##4caf50",
			status: "approved",
		},
	]);
};
