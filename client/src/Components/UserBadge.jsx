import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../Context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

function UserBadge({ wh, id, onClick }) {
	const { user } = useAuth();
	const [badgeUser, setBadgeUser] = useState(null);

	useEffect(() => {
		if (!id) {
			setBadgeUser(user);
		} else {
			fetch(`${API_URL}/user/${id}`)
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`HTTP error! status: ${response.status}`
						);
					}
					return response.json();
				})
				.then((data) => {
					setBadgeUser(data[0]);
				})
				.catch((error) => {
					console.error("Error fetching user data:", error);
				});
		}
	}, [id, user]);

	// Generate a color based on the crew name
	const generateColorFromSeed = (seed) => {
		if (!seed) return "#9E9E9E"; // Default color if no crew is provided
		let hash = 0;
		for (let i = 0; i < seed.length; i++) {
			hash = seed.charCodeAt(i) + ((hash << 5) - hash);
		}
		const color = `#${((hash >> 24) & 0xff)
			.toString(16)
			.padStart(2, "0")}${((hash >> 16) & 0xff)
			.toString(16)
			.padStart(2, "0")}${((hash >> 8) & 0xff)
			.toString(16)
			.padStart(2, "0")}`;
		return color;
	};

	const badgeColor = badgeUser
		? generateColorFromSeed(badgeUser.crew)
		: "#9E9E9E"; // Default color if no user or crew is available

	const tooltipContent = badgeUser ? (
		<Box sx={{ p: 1 }}>
			<div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
				{`${badgeUser.rank} ${badgeUser.first_name} ${badgeUser.last_name}`}
			</div>
		</Box>
	) : (
		<Box sx={{ p: 1 }}>
			<div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
				{"Login"}
			</div>
		</Box>
	);

	return (
		<div onClick={onClick}>
			<Tooltip title={tooltipContent} arrow>
				{badgeUser ? (
					<Avatar
						alt="User"
						sx={{
							width: wh,
							height: wh,
							backgroundColor: badgeColor, // Apply generated color
							color: "#fff", // Ensure text is visible
						}}
					>
						{badgeUser.last_name[0]}
					</Avatar>
				) : (
					<PersonIcon
						alt="User"
						sx={{ width: "30px", height: "30px" }}
					/>
				)}
			</Tooltip>
		</div>
	);
}

export default UserBadge;
