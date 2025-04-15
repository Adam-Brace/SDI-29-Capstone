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
		const userId = id || user?.id; // Use the provided id or fallback to the logged-in user's id
		if (!userId) return;

		fetch(`${API_URL}/user/${userId}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data && data.length > 0) {
					setBadgeUser(data[0]);
				} else {
					console.warn("No user data found for id:", userId);
				}
			})
			.catch((error) => {
				console.error("Error fetching user data:", error);
			});
	}, [id, user]);

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
				{badgeUser && badgeUser.icon ? (
					<Avatar
						alt={`${badgeUser.first_name} ${badgeUser.last_name}`}
						sx={{
							width: wh,
							height: wh,
						}}
						src={badgeUser.icon} // Use the icon URL from the server
					/>
				) : (
					<Avatar
						sx={{
							width: wh,
							height: wh,
							backgroundColor: "#9E9E9E", // Default background color
							color: "#FFFFFF", // Default text color
						}}
					>
						{badgeUser?.last_name ? (
							badgeUser.last_name[0].toUpperCase()
						) : (
							<PersonIcon />
						)}
					</Avatar>
				)}
			</Tooltip>
		</div>
	);
}

export default UserBadge;
