import "@bitnoi.se/react-scheduler/dist/style.css";
import React, { useCallback, useState, useEffect } from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "../../styles/HomePage.css";
const API_URL = import.meta.env.VITE_API_URL;

import EventDetailsDialog from "./Dialog Components/EventDetailsDialog";
import EditEventDialog from "./Dialog Components/EditEventDialog";
import CreateEventDialog from "./Dialog Components/CreateEventDialog";
import { useTheme } from "../../Context/ThemeContext.jsx";
import { useAuth } from "../../Context/AuthContext";
import { getEventColor, getDefaultDates } from "./utilityFunctions"; //

dayjs.extend(isBetween);

export default function Schedule() {
	const { theme } = useTheme();
	const { user } = useAuth();
	const [filterButtonState, setFilterButtonState] = useState(0);
	const [SchedulerData, setSchedulerData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedTile, setSelectedTile] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openUsersDialog, setOpenUsersDialog] = useState(false);
	const [createForm, setCreateForm] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: "",
	});
	const [editForm, setEditForm] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: "",
	});

	useEffect(() => {
		fetchEvents();
	}, []);

	// FETCHES EVENTS FROM SERVER
	const fetchEvents = async () => {
		setIsLoading(true);
		console.log(`${API_URL}/events/`);
		try {
			const response = await fetch(`${API_URL}/events/`);

			if (!response.ok) {
				console.error(
					"Server error:",
					response.status,
					response.statusText
				);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			//ADDS COLOR TO EVENTS BASED ON DESCRIPTION
			const dataWithColors = data.map((person) => ({
				...person,
				data: person.data.map((event) => ({
					...event,
					bgColor: getEventColor(event.description),
				})),
			}));
			setSchedulerData(dataWithColors);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const [range, setRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleRangeChange = useCallback((range) => {
		setRange(range);
	}, []);

	//DELETE EVENT
	const handleDeleteEvent = async () => {
		if (!selectedTile || !selectedTile.id) return;

		try {
			const response = await fetch(
				`${API_URL}/events/${selectedTile.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				// Refresh the events after deletion
				fetchEvents();
				// Clear the selected tile
				setSelectedTile(null);
				// Close the details dialog
				setOpenDialog(false);
			} else {
				console.error("Failed to delete:", response.statusText);
			}
		} catch (error) {
			console.error("Error deleting:", error);
		}
	};

	//EDIT EVENT DETAILS
	const handleOpenEditDialog = () => {
		if (!selectedTile) return;

		// Format dates for the form
		const startDate = dayjs(selectedTile.startDate).format(
			"YYYY-MM-DDTHH:mm"
		);
		const endDate = dayjs(selectedTile.endDate).format("YYYY-MM-DDTHH:mm");

		setEditForm({
			title: selectedTile.title || "",
			startDate: startDate,
			endDate: endDate,
			description: selectedTile.description || "",
		});

		setOpenEditDialog(true);
	};

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditForm({
			...editForm,
			[name]: value,
		});
	};

	const handleCreateInputChange = (e) => {
		const { name, value } = e.target;
		setCreateForm({
			...createForm,
			[name]: value,
		});
	};

	//UPDATES EVENT
	const handleUpdateEvent = async () => {
		if (!selectedTile || !selectedTile.id) return;

		try {
			const response = await fetch(
				`${API_URL}/events/${selectedTile.id}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: editForm.title,
						startDate: editForm.startDate,
						endDate: editForm.endDate,
						description: editForm.description,
					}),
				}
			);

			if (response.ok) {
				// Refresh the events after update
				fetchEvents();
				// Close the edit dialog
				handleCloseEditDialog();
				// Update the selected tile with new data
				setSelectedTile({
					...selectedTile,
					title: editForm.title,
					startDate: editForm.startDate,
					endDate: editForm.endDate,
					description: editForm.description,
				});
			} else {
				console.error("Failed to update:", response.statusText);
			}
		} catch (error) {
			console.error("Error updating:", error);
		}
	};

	//CREATES NEW EVENT
	const handleCreateEvent = async (userMessage) => {
		if (!selectedUser) return;

		try {
			const response = await fetch(`${API_URL}/events/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: selectedUser.id,
					title: createForm.title,
					startDate: createForm.startDate,
					endDate: createForm.endDate,
					description: createForm.description,
					bgColor: getEventColor(createForm.description),
					user_message: userMessage || null,
				}),
			});

			if (response.ok) {
				// Refresh the events after creation
				fetchEvents();
				// Reset the create form
				setCreateForm({
					title: "",
					startDate: "",
					endDate: "",
					description: "",
				});
				// Close the create dialog
				setOpenUsersDialog(false);
			} else {
				console.error("Failed to create:", response.statusText);
			}
		} catch (error) {
			console.error("Error creating:", error);
		}
	};

	const handleOpenDetailsDialog = (item) => {
		setSelectedTile(item);
		setOpenDialog(true);
	};

	const handleCloseDetailsDialog = () => {
		setOpenDialog(false);
	};

	const handleOpenUsersDialog = (selectedUser) => {
		// Allow admins to create events for any user, but regular users can only create events for themselves
		if (user.permissions === "admin" || selectedUser.id === user.id) {
			setSelectedUser(selectedUser);

			// Set default dates to current date/time
			const defaultDates = getDefaultDates();

			setCreateForm({
				title: "",
				startDate: defaultDates.startDate,
				endDate: defaultDates.endDate,
				description: "",
			});

			setOpenUsersDialog(true);
		}
	};

	const handleCloseUsersDialog = () => {
		setOpenUsersDialog(false);
		setSelectedUser(null);
	};

	const filteredSchedulerData = SchedulerData.map((person) => ({
		...person,
		data: person.data.filter(
			(project) =>
				dayjs(project.startDate).isBetween(
					range.startDate,
					range.endDate
				) ||
				dayjs(project.endDate).isBetween(
					range.startDate,
					range.endDate
				) ||
				(dayjs(project.startDate).isBefore(range.startDate, "day") &&
					dayjs(project.endDate).isAfter(range.endDate, "day"))
		),
	}));

	return (
		<div>
			<section className="schedule-container">
				<Scheduler
					key={theme}
					data={filteredSchedulerData}
					isLoading={isLoading}
					onRangeChange={handleRangeChange}
					onTileClick={(clickedResource) => {
						handleOpenDetailsDialog(clickedResource);
						console.log(clickedResource);
					}}
					onItemClick={(item) => {
						handleOpenUsersDialog(item);
						console.log(item);
					}}
					config={{
						zoom: 1,
						filterButtonState: -1,
						showThemeToggle: false,
						defaultTheme: theme === "dark" ? "dark" : "light",
						showTooltip: false,
					}}
				/>
			</section>

			{/* Event Details Dialog */}
			<EventDetailsDialog
				open={openDialog}
				onClose={handleCloseDetailsDialog}
				selectedTile={selectedTile}
				onEdit={handleOpenEditDialog}
				onDelete={handleDeleteEvent}
			/>

			{/* Edit Event Dialog */}
			<EditEventDialog
				open={openEditDialog}
				onClose={handleCloseEditDialog}
				editForm={editForm}
				onInputChange={handleInputChange}
				onSave={handleUpdateEvent}
			/>

			{/* Create Event Dialog */}
			<CreateEventDialog
				open={openUsersDialog}
				onClose={handleCloseUsersDialog}
				selectedUser={selectedUser}
				createForm={createForm}
				onInputChange={handleCreateInputChange}
				onCreate={handleCreateEvent}
			/>
		</div>
	);
}
