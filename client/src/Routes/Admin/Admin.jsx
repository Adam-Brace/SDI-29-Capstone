import React, { use, useEffect, useState } from "react";
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
import UserBadge from "../../Components/UserBadge";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
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

	useEffect(() => {
		fetch(`${API_URL}/events/raw`)
			.then((res) => res.json())
			.then((data) => {
				setEvents(data);
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
					{user.permissions == "admin" && <Tab label="Requests" />}
					{user.permissions == "admin" && <Tab label="Users" />}
				</Tabs>
				<Divider sx={{ marginY: 2 }} />
				{tabValue === 0 && (
					<List>
						{events.map((userEvent) =>
							user.id == userEvent.id
								? userEvent.data.map((event) => (
										<ListItem
											key={event.id}
											onClick={() =>
												setSelectedEvent(event)
											} // Edit on click
											button // Makes the ListItem clickable
										>
											<ListItemText
												primary={event.title}
												secondary={event.description}
											/>
										</ListItem>
								  ))
								: userEvent.data.length > 0 && (
										<ListItem key={0}>
											<ListItemText
												primary={"No requests Found"}
											/>
										</ListItem>
								  )
						)}
					</List>
				)}
				{tabValue === 1 && (
					<List>
						{events.map((userEvent) =>
							userEvent.data.map((event) => (
								<ListItem
									key={event.id}
									onClick={() => setSelectedEvent(event)} // Edit on click
									button // Makes the ListItem clickable
								>
									<ListItemText
										primary={event.title}
										secondary={event.description}
									/>
								</ListItem>
							))
						)}
					</List>
				)}
				{tabValue === 2 && (
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
									onClick={() => {
										setSelectedUser(userMap);
									}}
									button
								>
									<ListItemAvatar>
										<UserBadge id={userMap.id} />
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
			</Box>

			{/* Main Content */}
			<Box
				sx={{
					flex: 1,
					padding: 3,
					overflowY: "auto",
				}}
			>
				{(tabValue === 0 || tabValue === 1) &&
					(selectedEvent ? (
						<Box>
							<Typography variant="h4" gutterBottom>
								{selectedEvent.title}
							</Typography>
							<Typography variant="body1">
								{selectedEvent.description}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Start Date: {selectedEvent.start_date}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								End Date: {selectedEvent.end_date}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Color: {selectedEvent.color}
							</Typography>
						</Box>
					) : (
						<Typography variant="h6" color="textSecondary">
							Select a event to view.
						</Typography>
					))}
				{tabValue === 2 &&
					(selectedUser ? (
						<Box>
							<Typography variant="h4" gutterBottom>
								{selectedUser.rank} {selectedUser.first_name}{" "}
								{selectedUser.last_name}'s Details
							</Typography>
							<Box>
								<Typography variant="body2" gutterBottom>
									First Name: {selectedUser.first_name}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Last Name: {selectedUser.last_name}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Rank: {selectedUser.rank}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Email: {selectedUser.email}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Duty Phone: {selectedUser.phone}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Organization: {selectedUser.organization}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Crew: {selectedUser.crew}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Position: {selectedUser.position}
								</Typography>
								<Typography variant="body2" gutterBottom>
									Role: {selectedUser.permissions}
								</Typography>
							</Box>
							<Edit
								id={selectedUser.id}
								currentData={selectedUser}
							/>
						</Box>
					) : (
						<Typography variant="h6" color="textSecondary">
							Select a user to view and edit their details.
						</Typography>
					))}
			</Box>
		</Box>
	);
}
