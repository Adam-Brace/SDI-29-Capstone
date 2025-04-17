import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import UserBadge from "./UserBadge";
import { Stack, Chip, Typography, Box, TextField, Button } from "@mui/material";
import { useAuth } from "../Context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

export default function Chat({ id }) {
	const { user } = useAuth();
	const [mainChat, setMainChat] = useState({ messages: [] });
	const [messageInput, setMessageInput] = useState("");
	const messagesEndRef = useRef(null); // Ref for the invisible div at the bottom
	const scrollableContainerRef = useRef(null); // Ref for the scrollable container

	useEffect(() => {
		// Fetch initial chat data
		fetch(`${API_URL}/message/message/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setMainChat(data[0]);
			})
			.catch((error) => {
				console.error("Error fetching chat data:", error);
			});

		// Listen for new messages from the server
		socket.on("new_message", (newMessage) => {
			if (newMessage.chat_id === id) {
				setMainChat((prevChat) => ({
					...prevChat,
					messages: [...prevChat.messages, newMessage],
				}));
			}
		});

		// Cleanup the socket connection on component unmount
		return () => {
			socket.off("new_message");
			socket.disconnect();
		};
	}, [id]);

	// Scroll to the bottom whenever messages change
	useEffect(() => {
		scrollToBottom();
	}, [mainChat.messages]);

	// Function to scroll to the bottom of the messages
	const scrollToBottom = () => {
		if (scrollableContainerRef.current) {
			scrollableContainerRef.current.scrollTo({
				top: scrollableContainerRef.current.scrollHeight, // Scroll to the bottom
				behavior: "smooth", // Smooth scrolling
			});
		}
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
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100vh", // Full height for the chat component
				overflow: "hidden", // Prevents the entire page from scrolling
			}}
		>
			{/* Chat Name (Locked at the Top) */}
			<Typography variant="h5" gutterBottom>
				{mainChat.name}
			</Typography>

			{/* Scrollable Messages */}
			<Box
				ref={scrollableContainerRef} // Attach the ref to the scrollable container
				sx={{
					flex: 1, // Makes this section take up the remaining space
					overflowY: "auto", // Enables vertical scrolling
					padding: "25px",
					// Space for the input box
					position: "relative", // Ensures proper positioning
				}}
			>
				<Stack spacing={2}>
					{mainChat.messages.map((message) => chip(message))}
				</Stack>
				{/* Invisible div to scroll to */}
				<div ref={messagesEndRef} />
			</Box>

			{/* Message Input (Locked at the Bottom) */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					position: "sticky", // Keeps the input box at the bottom
					bottom: 0, // Sticks to the bottom of the parent container
					backgroundColor: "inherit", // Matches the background color
					padding: "25px",
					marginBottom: "100px",
					zIndex: 1, // Ensures it stays above other content
				}}
			>
				<TextField
					fullWidth
					autoComplete="off"
					required={true}
					label="Message"
					id="messageInput"
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleSendMessage(mainChat.id);
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
					onClick={() => handleSendMessage(mainChat.id)}
				>
					Submit
				</Button>
			</Box>
		</Box>
	);
}
