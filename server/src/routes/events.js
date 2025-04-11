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
			.where("events.status", "approved");

		const transformedData = usersWithEvents.reduce((acc, row) => {
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

		res.status(200).json(transformedData);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const events = await knex("events")
			.select()
			.where("user_id", req.params.id);

		const user = await knex("users")
			.select()
			.where("id", req.params.id)
			.first();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const response = {
			id: req.params.id,
			label: {
				title: `${user.rank} ${user.first_name} ${user.last_name}`,
			},
			data: events.map((event) => ({
				id: event.id,
				startDate: event.start_date,
				endDate: event.end_date,
				title: event.title,
				description: event.description,
				bgColor: event.color,
			})),
		};

		res.status(200).json(response);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
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

router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { startDate, endDate, title, description, bgColor } = req.body;

		const [updatedEvent] = await knex("events").where("id", id).update(
			{
				start_date: startDate,
				end_date: endDate,
				title,
				description,
				color: bgColor,
			},
			"*"
		);

		if (updatedEvent) {
			res.status(200).json(updatedEvent);
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

router.get("/raw", async (req, res) => {
	try {
		const events = await knex("events").select();
		res.status(200).json(events);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/raw/:id", async (req, res) => {
	try {
		const event = await knex("events")
			.select()
			.where("id", req.params.id)
			.first();

		if (event) {
			res.status(200).json(event);
		} else {
			res.status(404).json({ error: "Event not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
