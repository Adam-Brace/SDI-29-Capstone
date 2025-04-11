import React, { useEffect, useState } from "react";
import UserBadge from "./UserBadge";
import { Stack, Chip, Typography } from "@mui/material";
import { useAuth } from "../Context/AuthContext";

export default function Chat() {
	const { user } = useAuth();
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		if (!user) return;

		fetch(`http://localhost:3001/message/${1}`)
			.then((response) => response.json())
			.then((data) => {
				setMessages(data);
			})
			.catch((error) => {
				console.error("Error fetching chat data:", error);
			});
	}, [user]);

	const chip = (message, float) => (
		<>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent={float}
			>
				<Chip
					avatar={<UserBadge wh={"24px"} />}
					style={{ paddingLeft: "3px", color: "white" }}
					label={message}
					variant="outlined"
				/>
			</Stack>
		</>
	);

	return (
		<>
			{messages.map((message) => {
				<>
					<Typography variant="h5" gutterBottom>
						{message.name}
					</Typography>
					<Stack spacing={2} style={{ padding: "10px" }}>
						{chip(message.message, "floatLeft")}
					</Stack>
				</>;
			})}
		</>
	);
}
