const express = require("express");
const knex = require("knex")(require("../../knexfile")["development"]);
const router = express.Router();

router.get("/:user_id", async (req, res) => {
	knex("chat_members")
		.select()
		.where("user_id", req.params.user_id)
		.join("messages", "chat_members.chat_id", "messages.chat_id")
		.then((messages) => res.status(200).json(messages));
});

module.exports = router;
