const express = require("express");
const router = express.Router();

// GET all messages (for example, from DB)
router.get("/", async (req, res) => {
	// Simulated DB response
	const fakeMessages = [
		{ id: 1, text: "Hello" },
		{ id: 2, text: "Hi!" },
	];
	res.json(fakeMessages);
});

// POST a new message
router.post("/", async (req, res) => {
	const { text } = req.body;
	// Here you'd save to DB
	res.status(201).json({ success: true, text });
});

module.exports = router;
