import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../Context/AuthContext";

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
					<Avatar alt="User" sx={{ width: wh, height: wh }}>
						{badgeUser.last_name[0]}
					</Avatar>
				) : (
					<PersonIcon
						alt="User"
						sx={{ width: "30px", height: "30" }}
					/>
				)}
			</Tooltip>
		</div>
	);
}

export default UserBadge;
