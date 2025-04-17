/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex("events").del();
	await knex("events").insert([

	// Panama 12's for Users 1,2,3, & 4
		{
			user_id: 1,
			start_date: new Date("2025-04-14 00:00:00"),
			end_date: new Date("2025-04-15 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-04-14 00:00:00"),
			end_date: new Date("2025-04-15 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-04-16 00:00:00"),
			end_date: new Date("2025-04-17 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-04-16 00:00:00"),
			end_date: new Date("2025-04-17 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 1,
			start_date: new Date("2025-04-18 00:00:00"),
			end_date: new Date("2025-04-20 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-04-18 00:00:00"),
			end_date: new Date("2025-04-20 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-04-21 00:00:00"),
			end_date: new Date("2025-04-22 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-04-21 00:00:00"),
			end_date: new Date("2025-04-22 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 1,
			start_date: new Date("2025-04-23 00:00:00"),
			end_date: new Date("2025-04-24 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-04-23 00:00:00"),
			end_date: new Date("2025-04-24 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-04-25 00:00:00"),
			end_date: new Date("2025-04-27 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-04-25 00:00:00"),
			end_date: new Date("2025-04-27 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 1,
			start_date: new Date("2025-04-28 00:00:00"),
			end_date: new Date("2025-04-29 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-04-28 00:00:00"),
			end_date: new Date("2025-04-29 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-04-30 00:00:00"),
			end_date: new Date("2025-05-01 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-04-30 00:00:00"),
			end_date: new Date("2025-05-01 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 1,
			start_date: new Date("2025-05-02 00:00:00"),
			end_date: new Date("2025-05-04 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-05-02 00:00:00"),
			end_date: new Date("2025-05-04 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-05-05 00:00:00"),
			end_date: new Date("2025-05-06 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-05-05 00:00:00"),
			end_date: new Date("2025-05-06 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 1,
			start_date: new Date("2025-05-07 00:00:00"),
			end_date: new Date("2025-05-08 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 2,
			start_date: new Date("2025-05-07 00:00:00"),
			end_date: new Date("2025-05-08 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		{
			user_id: 3,
			start_date: new Date("2025-05-09 00:00:00"),
			end_date: new Date("2025-05-11 23:59:00"),
			title: "Panama 12's",
			description: "Day Shift",
			status: "approved",
		},
		{
			user_id: 4,
			start_date: new Date("2025-05-09 00:00:00"),
			end_date: new Date("2025-05-11 23:59:00"),
			title: "Panama 12's",
			description: "Night Shift",
			status: "approved",
		},

		// Inprocessing specialist
		{
			user_id: 6,
			start_date: new Date("2025-04-14 08:00:00"),
			end_date: new Date("2025-04-15 16:00:00"),
			title: "Inprocessing Brief",
			description: "Training",
			status: "approved",
		},
		{
			user_id: 6,
			start_date: new Date("2025-04-16 10:00:00"),
			end_date: new Date("2025-04-16 11:00:00"),
			title: "Dental",
			description: "Appointment",
			status: "approved",
		},
		{
			user_id: 6,
			start_date: new Date("2025-04-16 14:00:00"),
			end_date: new Date("2025-04-16 14:30:00"),
			title: "Finance",
			description: "Appointment",
			status: "approved",
		},

		// Captain
		{
			user_id: 5,
			start_date: new Date("2025-04-14 08:00:00"),
			end_date: new Date("2025-04-25 16:00:00"),
			title: "Vacation",
			description: "Leave",
			status: "approved",
		},
		{
			user_id: 5,
			start_date: new Date("2025-04-28 08:00:00"),
			end_date: new Date("2025-10-26 16:00:00"),
			title: "Supra Coders SDI",
			description: "TDY",
			status: "approved",
		},

		// Sgt Tomas Watkins
		{
			user_id: 7,
			start_date: new Date("2025-04-16 06:00:00"),
			end_date: new Date("2025-05-6 14:30:00"),
			title: "Field Ops",
			description: "Deployment",
			status: "approved",
		},
	]);
};
