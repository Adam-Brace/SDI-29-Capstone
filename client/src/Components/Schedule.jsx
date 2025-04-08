// import "@bitnoi.se/react-scheduler/dist/style.css";
import React, { useCallback, useState } from "react";
// import { Scheduler } from "@bitnoi.se/react-scheduler";
// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
import { useEffect } from "react";
import "../styles/HomePage.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

dayjs.extend(isBetween);

export default function Schedule() {
	const [filterButtonState, setFilterButtonState] = useState(0);
	const [SchedulerData, setSchedulerData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedTile, setSelectedTile] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [editForm, setEditForm] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: ""
	});

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:3001/events/");
			if (!response.ok) {
				console.error(
					"Server error:",
					response.status,
					response.statusText
				);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setSchedulerData(data);
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

	const handleDeleteEvent = async () => {
		if (!selectedTile || !selectedTile.id) return;
		
		try {
			const response = await fetch(`http://localhost:3001/events/${selectedTile.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			
			if (response.ok) {
				// Refresh the events after deletion
				fetchEvents();
				// Clear the selected tile
				setSelectedTile(null);
			} else {
				console.error('Failed to delete event:', response.statusText);
			}
		} catch (error) {
			console.error('Error deleting event:', error);
		}
	};

	const handleOpenDialog = () => {
		if (!selectedTile) return;
		
		// Format dates for the form
		const startDate = dayjs(selectedTile.startDate).format('YYYY-MM-DDTHH:mm');
		const endDate = dayjs(selectedTile.endDate).format('YYYY-MM-DDTHH:mm');
		
		setEditForm({
			title: selectedTile.title || "",
			startDate: startDate,
			endDate: endDate,
			description: selectedTile.description || ""
		});
		
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEditForm({
			...editForm,
			[name]: value
		});
	};

	const handleUpdateEvent = async () => {
		if (!selectedTile || !selectedTile.id) return;
		
		try {
			const response = await fetch(`http://localhost:3001/events/${selectedTile.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...selectedTile,
					title: editForm.title,
					startDate: editForm.startDate,
					endDate: editForm.endDate,
					description: editForm.description
				})
			});
			
			if (response.ok) {
				// Refresh the events after update
				fetchEvents();
				// Close the dialog
				handleCloseDialog();
				// Update the selected tile with new data
				setSelectedTile({
					...selectedTile,
					title: editForm.title,
					startDate: editForm.startDate,
					endDate: editForm.endDate,
					description: editForm.description
				});
			} else {
				console.error('Failed to update event:', response.statusText);
			}
		} catch (error) {
			console.error('Error updating event:', error);
		}
	};

	// Filtering events that are included in current date range
	// Example can be also found on video https://youtu.be/9oy4rTVEfBQ?t=118&si=52BGKSIYz6bTZ7fx
	// and in the react-scheduler repo App.tsx file https://github.com/Bitnoise/react-scheduler/blob/master/src/App.tsx
	const filteredSchedulerData = SchedulerData.map((person) => ({
		...person,
		data: person.data.filter(
			(project) =>
				// we use "dayjs" for date calculations, but feel free to use library of your choice
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
					data={filteredSchedulerData}
					isLoading={isLoading}
					onRangeChange={handleRangeChange}
					onTileClick={(clickedResource) => {setSelectedTile(clickedResource); console.log(clickedResource)}}
					onItemClick={(item) => { setSelectedTile(item); console.log(item); }}
					onFilterData={() => {
						// Some filtering logic...
						setFilterButtonState(1);
					}}
					onClearFilterData={() => {
						// Some clearing filters logic...
						setFilterButtonState(0);
					}}
					config={{
						zoom: 1,
						filterButtonState,
						defaultTheme: "dark",
					}}
				/>
			</section>
			<div className="details-container">
				{selectedTile && (
					<div className="selected-item-container">
						<h3>Selected Event Details</h3>
						<div className="event-details">
							<p><strong>Title:</strong> {selectedTile.title}</p>
							<p><strong>Start Date:</strong> {dayjs(selectedTile.startDate).format('MMMM D, YYYY h:mm A')}</p>
							<p><strong>End Date:</strong> {dayjs(selectedTile.endDate).format('MMMM D, YYYY h:mm A')}</p>
							{selectedTile.description && <p><strong>Description:</strong> {selectedTile.description}</p>}
						</div>
						<div className="event-actions">
							<div className="button-group">
								<Button 
									variant="contained" 
									color="primary" 
									startIcon={<EditIcon />}
									onClick={handleOpenDialog}
									className="edit-button"
								>
									
								</Button>
								<Button 
									variant="contained" 
									color="error" 
									startIcon={<DeleteIcon />}
									onClick={handleDeleteEvent}
									className="delete-button"
								>
									
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>


			{/* <Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Edit</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="title"
						label="Title"
						type="text"
						fullWidth
						value={editForm.title}
						onChange={handleInputChange}
					/>
					<TextField
						margin="dense"
						name="startDate"
						label="Start Date & Time"
						type="datetime-local"
						fullWidth
						value={editForm.startDate}
						onChange={handleInputChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						margin="dense"
						name="endDate"
						label="End Date & Time"
						type="datetime-local"
						fullWidth
						value={editForm.endDate}
						onChange={handleInputChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						margin="dense"
						name="description"
						label="Description"
						type="text"
						fullWidth
						multiline
						rows={4}
						value={editForm.description}
						onChange={handleInputChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={handleUpdateEvent} color="primary">Save</Button>
				</DialogActions>
			</Dialog> */}
		</div>
	);
}
