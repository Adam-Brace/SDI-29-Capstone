const express = require("express");
const { createCanvas } = require("canvas");
const router = express.Router();
const argon2 = require("argon2");
const knex = require("knex")(require("../../knexfile")["development"]);
var PORT = process.env.SERVER_PORT;

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
}

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
		.then((data) =>
			data.map((user) => ({
				...user, // Spread the existing user properties
				icon: `http://localhost:${PORT}/user/generate-image/${user.id}`, // Add the icon property
			}))
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
		.then((data) =>
			data.map((user) => ({
				...user, // Spread the existing user properties
				icon: `http://localhost:${PORT}/user/generate-image/${user.id}`, // Add the icon property
			}))
		)
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
	const user = await knex("users").where("email", email).first();
	if (user) {
		return res.status(409).json({ error: "User already exists" });
	}
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

// Route to generate an image
router.get("/generate-image/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Fetch user details from the database
		const user = await knex("users").where("id", id).first();
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const { crew, last_name } = user;

		// Generate background color based on crew
		const bgColor = generateColorFromSeed(crew || "default");

		// Determine text color for visibility
		const textColor = getContrastingTextColor(bgColor);

		// Create a canvas
		const canvas = createCanvas(100, 100); // 100x100 px image
		const ctx = canvas.getContext("2d");

		// Draw background
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Draw the first letter of the last name
		ctx.fillStyle = textColor;
		ctx.font = "bold 50px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(
			last_name[0].toUpperCase(),
			canvas.width / 2,
			canvas.height / 2
		);

		// Send the image as a response
		res.setHeader("Content-Type", "image/png");
		canvas.pngStream().pipe(res);
	} catch (error) {
		console.error("Error generating image:", error);
		res.status(500).json({ error: "Failed to generate image" });
	}
});

// Utility function to generate a color based on a seed
const generateColorFromSeed = (seed) => {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = seed.charCodeAt(i) + ((hash << 5) - hash);
	}
	const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
		(hash >> 16) &
		0xff
	)
		.toString(16)
		.padStart(2, "0")}${((hash >> 8) & 0xff)
		.toString(16)
		.padStart(2, "0")}`;
	return color;
};

// Utility function to determine text color based on background brightness
const getContrastingTextColor = (bgColor) => {
	// Convert hex color to RGB
	const r = parseInt(bgColor.slice(1, 3), 16);
	const g = parseInt(bgColor.slice(3, 5), 16);
	const b = parseInt(bgColor.slice(5, 7), 16);

	// Calculate brightness (YIQ formula)
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	// Return black for bright backgrounds, white for dark backgrounds
	return brightness > 128 ? "#000000" : "#FFFFFF";
};

module.exports = router;
