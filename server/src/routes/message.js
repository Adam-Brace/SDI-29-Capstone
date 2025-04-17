const express = require("express");
const knex = require("knex")(require("../../knexfile")["development"]);
const router = express.Router();

router.get("/message/:user_id", async (req, res) => {
	let items = [];
	knex("chat_members")
		.select("chat_id")
		.where("user_id", req.params.user_id)
		.then((chatIds) => {
			chatIds = chatIds.map((chat) => {
				knex("chats")
					.select()
					.where("id", chat.chat_id)
					.then((chat) => {
						knex("messages")
							.select()
							.where("chat_id", chat[0].id)
							.then((messages) => {
								items.push({
									id: chat[0].id,
									name: chat[0].name,
									is_group: chat[0].is_group,
									messages: messages,
								});
							})
							.then(() => res.status(200).json(items))
							.catch((err) =>
								res.status(500).json({ error: err.message })
							);
					});
			});
		});
});

router.post("/message/", async (req, res) => {
	knex("messages")
		.insert(req.body)
		.then(() => res.status(200).json({ message: "Message added" }))
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/chat/", async (req, res) => {
	knex("chats")
		.insert(req.body)
		.returning("id")
		.then((ids) =>
			res.status(200).json({ message: "Chat added", id: ids[0] })
		)
		.catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/chat_members/", async (req, res) => {
	knex("chat_members")
		.insert(req.body)
		.then(() => res.status(200).json({ message: "Member added" }))
		.catch((err) => {
			res.status(500).json({ error: err.message });
		});
});

router.patch("/events/:id", async (req, res) => {
	const { id } = req.params;
	const { chat_id } = req.body;

	try {
		// Update the event with the new chat_id
		const updatedRows = await knex("events")
			.where("id", id) // Ensure `id` is used correctly
			.update({ chat_id: parseInt(chat_id) }); // Ensure `chat_id` is passed as an object

		if (updatedRows === 0) {
			return res.status(404).json({ error: "Event not found" });
		}

		res.status(200).json({ message: "Event updated successfully" });
	} catch (err) {
		console.error("Error updating event:", err);
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
