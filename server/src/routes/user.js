const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const knex = require("knex")(require("../knexfile")["development"]);

router.get("/", (req, res) => {
	knex("user")
		.select(
			"id",
			"firstName",
			"lastName",
			"rank",
			"email",
			"phone",
			"organization",
			"crew",
			"position",
			"permissions"
		)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
	knex("user")
		.select(
			"id",
			"firstName",
			"lastName",
			"rank",
			"email",
			"phone",
			"organization",
			"crew",
			"position",
			"permissions"
		)
		.where("id", req.params.id)
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/", async (req, res) => {
	const {
		password,
		first_name,
		last_name,
		rank,
		email,
		phone,
		organization,
		crew,
		position,
		permissions,
	} = req.body;
	const hashedPassword = await argon2.hash(password);
	knex("user")
		.insert({
			password: hashedPassword,
			first_name,
			last_name,
			rank,
			email,
			phone,
			organization,
			crew,
			position,
			permissions,
		})
		.then(() => res.status(201).json({ message: "User created" }))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.patch("/:id", async (req, res) => {
	const {
		password,
		first_name,
		last_name,
		rank,
		email,
		phone,
		organization,
		crew,
		position,
		permissions,
	} = req.body;

	let updateData = {
		first_name,
		last_name,
		rank,
		email,
		phone,
		organization,
		crew,
		position,
		permissions,
	};

	if (password) {
		updateData.password = await argon2.hash(password);
	}

	knex("user")
		.where("id", req.params.id)
		.update(updateData)
		.then(() => res.status(200).json({ message: "User updated" }))
		.catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
