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
			)
			.where(events.status, "approved");

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

router.post("/", async (req, res) => {
	try {
		const { user_id, startDate, endDate, title, description, bgColor } =
			req.body;

		const [newEvent] = await knex("events")
			.insert({
				user_id,
				start_date: startDate,
				end_date: endDate,
				title,
				description,
				color: bgColor,
			})
			.returning("*");

		res.status(201).json(newEvent);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.patch("/:user_id", async (req, res) => {
	try {
		const { user_id } = req.params;
		const { startDate, endDate, title, description, bgColor } = req.body;

		const updatedEvent = await knex("events")
			.where("id", id)
			.update({
				start_date: startDate,
				end_date: endDate,
				title,
				description,
				color: bgColor,
			})
			.returning("*");
		if (updatedEvent.length > 0) {
			res.status(200).json(updatedEvent[0]);
		} else {
			res.status(404).json({ error: "Event not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedEvent = await knex("events").where("id", id).del();

		if (deletedEvent) {
			res.status(200).json({ message: `Event ${id} has been deleted!` });
		} else {
			res.status(404).json({ error: "Event does not exist" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/raw", (req, res) => {
	knex("events")
		.select()
		.then((events) => {
			res.status(200).json(events);
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});
router.get("/raw/:id", (req, res) => {
	knex("events")
		.select()
		.where("id", req.params.id)
		.then((events) => {
			res.status(200).json(events);
		})
		.catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
