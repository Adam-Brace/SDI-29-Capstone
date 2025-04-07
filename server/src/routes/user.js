const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", (req, res) => {
	knex("users")
		.select(
			"id",
			"first_name",
			"last_name",
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
	knex("users")
		.select(
			"id",
			"first_name",
			"last_name",
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
	knex("users")
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

	knex("users")
		.where("id", req.params.id)
		.update(updateData)
		.then(() => res.status(200).json({ message: "User updated" }))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
	knex("users")
		.where("id", req.params.id)
		.del()
		.then(() => res.status(200).json({ message: "User deleted" }))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await knex("users").where({ email }).first();

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isMatch = await argon2.verify(user.password, password);
		if (!isMatch) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		res.json({ message: "Login successful", user });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ error: "Failed to login" });
	}
});

module.exports = router;
