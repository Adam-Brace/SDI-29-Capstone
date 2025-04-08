const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", async (req, res) => {
	try {
		const usersWithEvents = await knex("users")
			.leftJoin("events", "users.id", "events.user_id")
			.select(
				"users.id as user_id",
				"users.rank",
				"users.crew",
				"users.position",
				"users.first_name",
				"users.last_name",
				"events.id as event_id",
				"events.start_date",
				"events.end_date",
				"events.title",
				"events.description",
				"events.color"
			);

		// Transform the data into the desired structure
		const data = usersWithEvents.reduce((acc, row) => {
			let user = acc.find((u) => u.id === row.user_id);
			if (!user) {
				user = {
					id: row.user_id,
					label: {
						title: `${row.rank} ${row.first_name} ${row.last_name}`,
						subtitle: `${row.crew} ${row.position}`,
					},
					data: [],
				};
				acc.push(user);
			}
			if (row.event_id) {
				user.data.push({
					id: row.event_id,
					startDate: row.start_date,
					endDate: row.end_date,
					title: row.title,
					description: row.description,
					bgColor: row.color,
				});
			}
			return acc;
		}, []);

		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:id", (req, res) => {
	let items = [];
	knex("events")
		.select()
		.where("user_id", req.params.id)
		.then((events) => {
			events.map((event) => {
				items.push({
					id: event.id,
					startDate: event.start_date,
					endDate: event.end_date,
					title: event.title,
					description: event.description,
					bgColor: event.color,
				});
			});
		})
		.then(() => {
			knex("users")
				.select()
				.where("id", req.params.id)
				.select()
				.then((data) => {
					let event = {
						id: req.params.id,
						label: {
							title: `${data[0].rank} ${data[0].first_name} ${data[0].last_name}`,
						},
						data: items,
					};
					res.status(200).json(event);
				})
				.catch((err) => res.status(500).json({ error: err.message }));
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/raw", (req, res) => {});
router.get("/raw/:id", (req, res) => {});

module.exports = router;
