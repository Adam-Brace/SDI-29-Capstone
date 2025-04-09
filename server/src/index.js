const path = require("path");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
var CLIENT_PORT = process.env.CLIENT_PORT;
const cors = require("cors");

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
	CLIENT_PORT = process.env.CLIENT_PORT;
}

const socket = http.createServer(app);
const io = new Server(socket, {
	cors: {
		origin: `http://localhost:${CLIENT_PORT}`,
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/user");
const eventsRoute = require("./routes/events");
const messageRoute = require("./routes/message");

app.use("/user", userRoute);
app.use("/events", eventsRoute);
app.use("/message", messageRoute);

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	socket.on("send_message", (data) => {
		io.emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
	});
});

app.use((req, res) => {
	res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res) => {
	console.error("Server error:", err);
	res.status(500).json({ error: "Internal Server Error" });
});

const server = socket.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };
