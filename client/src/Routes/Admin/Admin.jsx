import React, { useEffect, useState } from "react";
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tabs,
	Tab,
	TextField,
	Badge,
	Typography,
	Divider,
	Card,
	CardContent,
	Button,
} from "@mui/material";
import ChatBubble from "@mui/icons-material/ChatBubble";
import ChatIcon from "@mui/icons-material/Chat";
import Tooltip from "@mui/material/Tooltip";
import Edit from "../../UserData/Edit";
import UserBadge from "../../Components/UserBadge";
import { useAuth } from "../../Context/AuthContext";
import "../../styles/Admin.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
	const { user } = useAuth();
	const [users, setUsers] = useState([]);
	const [events, setEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [dialog, setDialog] = useState({ open: false });
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);
	const [tabValue, setTabValue] = useState(0);

	const statusOrder = {
		pending: 0,
		approved: 1,
		denied: 2,
	};

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
		setSelectedEvent(null);
		setSelectedUser(null);
		setSearchTerm("");
		if (newValue === 1) {
			setFilteredEvents(events);
		} else if (newValue === 2) {
			setFilteredUsers(users);
		}
	};

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: timeZone,
		});
	};

	// Fetch all users and store them in the `users` state
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
				setFilteredEvents(data);
			})
			.catch((err) => console.error("Error fetching users:", err));
	}, []);

	useEffect(() => {
		// Disable scrolling when the component mounts
		document.body.style.overflow = "hidden";

		// Re-enable scrolling when the component unmounts
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const handleSearchChange = (event) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);

		if (tabValue === 2) {
			// Filter users
			setFilteredUsers(
				users.filter(
					(userFilter) =>
						userFilter.first_name.toLowerCase().includes(term) ||
						userFilter.last_name.toLowerCase().includes(term) ||
						userFilter.rank.toLowerCase().includes(term) ||
						userFilter.email.toLowerCase().includes(term)
				)
			);
		} else if (tabValue === 1) {
			// Filter requests
			const filtered = events.filter((event) => {
				const user = getUserById(event.user_id);
				return (
					event.title.toLowerCase().includes(term) ||
					event.description.toLowerCase().includes(term) ||
					`${user.rank} ${user.first_name} ${user.last_name}`
						.toLowerCase()
						.includes(term)
				);
			});
			setFilteredEvents(filtered);
		}
	};

	// Helper function to get user details by ID
	const getUserById = (id) => {
		return users.find((user) => user.id === id) || {};
	};

	const handleApproveDeny = async (id, status, message, admin_id) => {
		console.log("handleApproveDeny called with:", id, status, message);
		try {
			const response = await fetch(`${API_URL}/events/${id}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					status,
					admin_message: message,
					admin_id,
				}),
			});

			if (!response.ok) {
				throw new Error(
					`Failed to update event: ${response.statusText}`
				);
			}

			const data = await response.json();
			console.log("Event updated successfully:", data);
			setEvents((prevEvents) =>
				prevEvents.map((event) =>
					event.id === id
						? { ...event, status, admin_message: message, admin_id }
						: event
				)
			);
			setSelectedEvent((prevSelectedEvent) =>
				prevSelectedEvent && prevSelectedEvent.id === id
					? {
							...prevSelectedEvent,
							status,
							admin_message: message,
							admin_id,
					  }
					: prevSelectedEvent
			);
		} catch (error) {
			console.error("Error updating event:", error.message);
		} finally {
			setDialog({ open: false });
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				height: "100vh",
			}}
		>
			{/* Sidebar */}
			<Box
				sx={{
					width: "30%",
					borderRight: 1,
					borderColor: "divider",
				}}
			>
				<Tabs
					sx={{ marginTop: 2 }}
					value={tabValue}
					onChange={handleTabChange}
					aria-label="Admin Tabs"
					centered
				>
					<Tab label="My Requests"></Tab>
					{user.permissions == "admin" && <Tab label="Requests" />}
					{user.permissions == "admin" && <Tab label="Users" />}
				</Tabs>
				<Divider sx={{ marginTop: 0 }} />
				<Box
					sx={{
						height: "calc(100vh - 64px)", // Adjust height as needed
						overflowY: "auto", // Enable vertical scrolling
						paddingLeft: 2,
						paddingRight: 4,
						paddingTop: 6,
					}}
				>
					{tabValue === 0 && (
						<Box>
							{filteredEvents
								.sort(
									(a, b) =>
										statusOrder[a.status] -
										statusOrder[b.status]
								)
								.map((userEvent) =>
									user.id === userEvent.user_id ? (
										<Badge
											key={userEvent.id}
											color={
												userEvent.status === "approved"
													? "success"
													: userEvent.status ===
													  "denied"
													? "error"
													: "warning"
											}
											badgeContent=" "
											sx={{ width: "100%" }}
										>
											<Card
												key={userEvent.id}
												sx={{
													width: "100%",
													marginBottom: 2,
													cursor: "pointer",
													"&:hover": {
														boxShadow: 6,
													},
												}}
												onClick={() =>
													setSelectedEvent(userEvent)
												} // Edit on click
											>
												<CardContent
													style={{
														paddingBottom: "16px",
													}}
												>
													<Typography
														variant="h6"
														gutterBottom
													>
														{userEvent.title}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
													>
														{userEvent.description}
													</Typography>
												</CardContent>
											</Card>
										</Badge>
									) : (
										userEvent.length > 0 && (
											<Card
												key={0}
												sx={{
													marginBottom: 2,
													cursor: "default",
												}}
											>
												<CardContent>
													<Typography
														variant="body2"
														color="textSecondary"
													>
														No requests found
													</Typography>
												</CardContent>
											</Card>
										)
									)
								)}
						</Box>
					)}
					{tabValue === 1 && (
						<>
							<TextField
								fullWidth
								variant="outlined"
								label="Search Requests"
								placeholder="Search by title or user"
								value={searchTerm}
								onChange={handleSearchChange}
								sx={{ marginBottom: 2 }}
							/>
							<Box>
								{filteredEvents
									.sort(
										(a, b) =>
											statusOrder[a.status] -
											statusOrder[b.status]
									)
									.map((userEvent) => (
										<Badge
											key={userEvent.id}
											color={
												userEvent.status === "approved"
													? "success"
													: userEvent.status ===
													  "denied"
													? "error"
													: "warning"
											}
											badgeContent=" "
											sx={{ width: "100%" }}
										>
											<Card
												key={userEvent.id}
												sx={{
													width: "100%",
													marginBottom: 2,
													cursor: "pointer",
													"&:hover": {
														boxShadow: 6,
													},
												}}
												onClick={() =>
													setSelectedEvent(userEvent)
												} // Edit on click
											>
												<CardContent
													style={{
														paddingBottom: "16px",
													}}
												>
													<Typography
														variant="h6"
														gutterBottom
													>
														{userEvent.title}
													</Typography>
													<Typography
														variant="h7"
														color="textSecondary"
													>
														{` Submitted By: ${
															getUserById(
																userEvent.user_id
															).rank || "N/A"
														} ${
															getUserById(
																userEvent.user_id
															).first_name ||
															"N/A"
														} ${
															getUserById(
																userEvent.user_id
															).last_name || "N/A"
														}`}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														sx={{
															paddingTop: "5px",
														}}
													>
														{userEvent.description}
													</Typography>
												</CardContent>
											</Card>
										</Badge>
									))}
							</Box>
						</>
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
							<Box>
								{filteredUsers.map((userMap) => (
									<Card
										key={userMap.id}
										sx={{
											marginBottom: 2,
											cursor: "pointer",
											"&:hover": {
												boxShadow: 6,
											},
										}}
										onClick={() => setSelectedUser(userMap)}
									>
										<CardContent
											style={{
												paddingBottom: "16px",
											}}
											sx={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<UserBadge id={userMap.id} />
											<Box sx={{ marginLeft: 2 }}>
												<Typography variant="h6">
													{`${userMap.rank} ${userMap.first_name} ${userMap.last_name}`}
												</Typography>
												<Typography
													variant="body2"
													color="textSecondary"
												>
													{userMap.email}
												</Typography>
											</Box>
										</CardContent>
									</Card>
								))}
							</Box>
						</>
					)}
				</Box>
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
						<Card
							key={selectedEvent.id}
							sx={{
								padding: "16px",
								boxShadow: 3,
								borderRadius: 2,
								marginBottom: 2,
							}}
						>
							<CardContent sx={{ padding: 0 }}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Typography variant="h4" gutterBottom>
										{selectedEvent.title}
									</Typography>
									<Tooltip title="Open new chat">
										<ChatBubble
											sx={{
												cursor: "pointer",
												marginTop: "-15px",
											}}
										/>
									</Tooltip>
									<Tooltip title="Open chat">
										<ChatIcon
											sx={{
												cursor: "pointer",
												marginTop: "-15px",
											}}
										/>
									</Tooltip>
								</Box>
								<Typography
									variant="h6"
									color="textSecondary"
									gutterBottom
								>
									{` Submitted By: ${
										getUserById(selectedEvent.user_id)
											.rank || "N/A"
									} ${
										getUserById(selectedEvent.user_id)
											.first_name || "N/A"
									} ${
										getUserById(selectedEvent.user_id)
											.last_name || "N/A"
									}`}
								</Typography>
								{selectedEvent.admin_id && (
									<Typography
										variant="h6"
										color="textSecondary"
										gutterBottom
									>
										{` Approved By: ${
											getUserById(selectedEvent.admin_id)
												.rank || "N/A"
										} ${
											getUserById(selectedEvent.admin_id)
												.first_name || "N/A"
										} ${
											getUserById(selectedEvent.admin_id)
												.last_name || "N/A"
										}`}
									</Typography>
								)}
								<Typography variant="body1" gutterBottom>
									Status:{" "}
									{selectedEvent.status.replace(
										/^./,
										(match) => match.toUpperCase()
									)}
								</Typography>
								{selectedEvent.user_message && (
									<Typography variant="body1" gutterBottom>
										User Message:{" "}
										{selectedEvent.user_message}
									</Typography>
								)}
								{selectedEvent.admin_message && (
									<Typography variant="body1" gutterBottom>
										Admin Message:{" "}
										{selectedEvent.admin_message}
									</Typography>
								)}
								<Typography variant="body2" gutterBottom>
									{selectedEvent.description}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									gutterBottom
								>
									Start Date:{" "}
									{formatTimestamp(selectedEvent.start_date)}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									gutterBottom
								>
									End Date:{" "}
									{formatTimestamp(selectedEvent.end_date)}
								</Typography>
							</CardContent>
							{tabValue === 1 && (
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										marginTop: 2,
									}}
								>
									<Button
										variant="contained"
										color="success"
										onClick={() =>
											setDialog({
												open: true,
												event: selectedEvent,
												status: "approved",
											})
										}
									>
										Approve
									</Button>
									<Button
										variant="contained"
										color="error"
										onClick={() =>
											setDialog({
												open: true,
												event: selectedEvent,
												status: "denied",
											})
										}
									>
										Deny
									</Button>
								</Box>
							)}
						</Card>
					) : (
						<Typography variant="h6" color="textSecondary">
							Select an event to view.
						</Typography>
					))}
				{tabValue === 2 &&
					(selectedUser ? (
						<Card
							sx={{
								padding: 0,
								boxShadow: 3,
								borderRadius: 2,
								marginBottom: 2,
							}}
						>
							<CardContent style={{ paddingBottom: "16px" }}>
								<Typography variant="h4" gutterBottom>
									{selectedUser.rank}{" "}
									{selectedUser.first_name}{" "}
									{selectedUser.last_name}'s Details
								</Typography>
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
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-start",
										marginTop: 2,
									}}
								>
									<Edit
										id={selectedUser.id}
										currentData={selectedUser}
									/>
								</Box>
							</CardContent>
						</Card>
					) : (
						<Typography variant="h6" color="textSecondary">
							Select a user to view and edit their details.
						</Typography>
					))}
				{dialog.open && (
					<Dialog
						open={dialog.open}
						onClose={() => setDialog({ open: false })}
					>
						<DialogTitle
							sx={{ paddingBottom: "0px" }}
						>{`${dialog.status.replace(/^./, (match) =>
							match.toUpperCase()
						)} - ${dialog.event.title}`}</DialogTitle>
						<DialogContent sx={{ paddingBottom: "0px" }}>
							<Typography variant="body2">
								Leave a message for the user if needed:
							</Typography>
						</DialogContent>
						<DialogContent sx={{ paddingBottom: "0px" }}>
							<TextField
								margin="dense"
								name="admin_message"
								label="Admin Message"
								type="text"
								fullWidth
								multiline
								rows={4}
								value={dialog.event.admin_message || ""}
								onChange={(e) =>
									setDialog((prev) => ({
										...prev,
										event: {
											...prev.event,
											admin_message: e.target.value,
										},
									}))
								}
							/>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={() => setDialog({ open: false })}
								color="secondary"
							>
								Cancel
							</Button>
							<Button
								onClick={() =>
									handleApproveDeny(
										dialog.event.id,
										dialog.status,
										dialog.event.admin_message,
										user.id
									)
								}
								color="primary"
								variant="contained"
							>
								Save
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</Box>
		</Box>
	);
}
