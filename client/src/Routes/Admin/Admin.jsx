import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Edit from "../../UserData/Edit";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	useEffect(() => {
		fetch(`${API_URL}/user`)
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
				setFilteredUsers(data);
			})
			.catch((err) => console.error("Error fetching users:", err));
	}, []);

	const handleSearchChange = (event) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredUsers(
			users.filter(
				(userFilter) =>
					userFilter.first_name.toLowerCase().includes(term) ||
					userFilter.last_name.toLowerCase().includes(term) ||
					userFilter.rank.toLowerCase().includes(term) ||
					userFilter.email.toLowerCase().includes(term)
			)
		);
	};

	const handleEditClick = (userData) => {
		setSelectedUser(userData);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "row", height: "100vh" }}>
			{/* Sidebar */}
			<Box
				sx={{
					width: "30%",
					borderRight: 1,
					borderColor: "divider",
					padding: 2,
				}}
			>
				<Tabs
					value={tabValue}
					onChange={handleTabChange}
					aria-label="Admin Tabs"
					centered
				>
					<Tab label="My Requests"></Tab>
					{user.permissions == "admin" && <Tab label="Users" />}
					{user.permissions == "admin" && <Tab label="Requests" />}
				</Tabs>
				<Divider sx={{ marginY: 2 }} />
				{tabValue === 0 && (
					<Typography variant="body1">
						Requests functionality coming soon...
					</Typography>
				)}

				{tabValue === 1 && (
					<>
						<TextField
							fullWidth
							variant="outlined"
							label="Search Users"
							placeholder="Search by name, rank, or email"
							value={searchTerm}
							onChange={handleSearchChange}
							sx={{ marginBottom: 2 }}
						/>
						<List>
							{filteredUsers.map((userMap) => (
								<ListItem
									key={userMap.id}
									onClick={() => handleEditClick(userMap)} // Edit on click
									button // Correctly use the button prop
									component="div" // Ensures it renders as a div instead of an li
								>
									<ListItemAvatar>
										<Avatar>
											{userMap.first_name[0]}
											{userMap.last_name[0]}
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={`${userMap.rank} ${userMap.first_name} ${userMap.last_name}`}
										secondary={userMap.email}
									/>
								</ListItem>
							))}
						</List>
					</>
				)}
				{tabValue === 2 && (
					<Typography variant="body1">
						Requests functionality coming soon.
					</Typography>
				)}
			</Box>

			{/* Main Content */}
			<Box
				sx={{
					flex: 1,
					padding: 3,
					overflowY: "auto",
				}}
			>
				{selectedUser && tabValue === 1 ? (
					<Box>
						<Typography variant="h4" gutterBottom>
							{selectedUser.rank} {selectedUser.first_name}{" "}
							{selectedUser.last_name}'s Details
						</Typography>
						<List>
							<ListItem>
								<ListItemText
									primary="First Name"
									secondary={selectedUser.first_name}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Last Name"
									secondary={selectedUser.last_name}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Rank"
									secondary={selectedUser.rank}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Email"
									secondary={selectedUser.email}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Duty Phone"
									secondary={selectedUser.phone}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Organization"
									secondary={selectedUser.organization}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Crew"
									secondary={selectedUser.crew}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Position"
									secondary={selectedUser.position}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Role"
									secondary={selectedUser.permissions}
								/>
							</ListItem>
						</List>
						<Edit id={selectedUser.id} currentData={selectedUser} />
					</Box>
				) : (
					<Typography variant="h6" color="textSecondary">
						Select a user to view and edit their details.
					</Typography>
				)}
			</Box>
		</Box>
	);
}
