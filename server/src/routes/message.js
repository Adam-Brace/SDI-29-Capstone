const express = require("express");
const knex = require("knex")(require("../../knexfile")["development"]);
const router = express.Router();

router.get("/:user_id", async (req, res) => {
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

module.exports = router;
