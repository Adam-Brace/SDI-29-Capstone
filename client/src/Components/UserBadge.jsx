import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useAuth } from "../Context/AuthContext";

function UserBadge({ wh }) {
	const { user } = useAuth();

	const tooltipContent = user && (
		<Box sx={{ p: 1 }}>
			<div style={{ fontWeight: "bold", fontSize: "0.875rem" }}>
				{`${user.rank} ${user.first_name} ${user.last_name}`}
			</div>
		</Box>
	);

	return (
		<>
			{user ? (
				<Tooltip title={tooltipContent} arrow>
					<Avatar alt="User" sx={{ width: wh, height: wh }}>
						{user.last_name[0]}
					</Avatar>
				</Tooltip>
			) : (
				<Avatar
					alt="User"
					src="https://dummyimage.com/40x40/cccccc/000000.png&text=User"
					sx={{ width: wh, height: wh }}
				/>
			)}
		</>
	);
}

export default UserBadge;
