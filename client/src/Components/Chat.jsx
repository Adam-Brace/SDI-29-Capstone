import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserBadge from "./UserBadge";
import { Stack, Chip, Typography, Box, TextField, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext";

const socket = io("http://localhost:3001");

export default function Chat() {
	const { user } = useAuth();
	const [chats, setChats] = useState([]);
	const [messageInput, setMessageInput] = useState("");

	useEffect(() => {
		if (!user) return;
		// Fetch initial chat data
		fetch(`http://localhost:3001/message/${user.id}`)
			.then((response) => response.json())
			.then((data) => {
				setChats(data);
			})
			.catch((error) => {
				console.error("Error fetching chat data:", error);
			});

		// Listen for new messages from the server
		socket.on("new_message", (newMessage) => {
			setChats((prevChats) =>
				prevChats.map((chat) =>
					chat.id === newMessage.chat_id
						? {
								...chat,
								messages: [...chat.messages, newMessage],
						  }
						: chat
				)
			);
			console.log("New message received:", newMessage);
		});

		// Cleanup the socket connection on component unmount
		return () => {
			socket.disconnect();
		};
	}, [user]);

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: timeZone,
		});
	};

	const chip = (message) => {
		let justifyContent = "flex-start";
		if (user.id === message.sender_id) {
			justifyContent = "flex-end";
		}

		return (
			<Box
				key={message.id}
				sx={{
					display: "flex",
					justifyContent: justifyContent,
					position: "relative",
					width: "100%",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems:
							justifyContent === "flex-start"
								? "flex-start"
								: "flex-end",
						maxWidth: "70%",
					}}
				>
					<Typography
						variant="caption"
						style={{
							color: "white",
							marginBottom: "4px",
						}}
					>
						{formatTimestamp(message.created_at)}
					</Typography>
					<Chip
						avatar={
							<UserBadge wh={"24px"} id={message.sender_id} />
						}
						style={{
							paddingLeft: "3px",
							color: "white",
							margin: "5px 0",
						}}
						label={message.content}
						variant="outlined"
					/>
				</Box>
			</Box>
		);
	};

	const handleSendMessage = (chatId) => {
		if (!messageInput.trim()) return;

		const newMessage = {
			chat_id: chatId,
			sender_id: user.id,
			content: messageInput,
		};

		socket.emit("send_message", newMessage);
		setMessageInput("");
	};

	return (
		<>
			{chats.map((chat) => {
				return (
					<div key={chat.id} style={{ padding: "10px" }}>
						<Typography variant="h5" gutterBottom>
							{chat.name}
						</Typography>
						<Stack spacing={2} style={{ padding: "10px" }}>
							{chat.messages.map((message) => chip(message))}
						</Stack>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<TextField
								fullWidth
								autoComplete="off"
								required={true}
								label="Message"
								id="messageInput"
								value={messageInput}
								onChange={(e) =>
									setMessageInput(e.target.value)
								}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleSendMessage(chat.id);
									}
								}}
								sx={{
									"& .MuiInputBase-input": {
										color: "white",
									},
									"& .MuiInputLabel-root": {
										color: "white",
									},
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderColor: "white",
										},
										"&:hover fieldset": {
											borderColor: "gray",
										},
										"&.Mui-focused fieldset": {
											borderColor: "gray",
										},
									},
								}}
							/>
							<Button
								variant="contained"
								color="primary"
								sx={{
									marginLeft: "10px",
								}}
								onClick={() => handleSendMessage(chat.id)}
							>
								Submit
							</Button>
						</Box>
					</div>
				);
			})}
		</>
	);
}
