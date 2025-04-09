import "@bitnoi.se/react-scheduler/dist/style.css";
import React, { useCallback, useState, useEffect } from "react";
import { Scheduler } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "../styles/HomePage.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

dayjs.extend(isBetween);

export default function Schedule({ theme }) {
	const [filterButtonState, setFilterButtonState] = useState(0);
	const [SchedulerData, setSchedulerData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedTile, setSelectedTile] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [editForm, setEditForm] = useState({
		title: "",
		startDate: "",
		endDate: "",
		description: ""
	});

	const themeMode = 'light'

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
				// Close the details dialog
				setOpenDialog(false);
			} else {
				console.error('Failed to delete event:', response.statusText);
			}
		} catch (error) {
			console.error('Error deleting event:', error);
		}
	};

	const handleOpenEditDialog = () => {
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
		
		setOpenEditDialog(true);
	};

	const handleCloseEditDialog = () => {
		setOpenEditDialog(false);
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
				// Close the edit dialog
				handleCloseEditDialog();
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

	const handleOpenDetailsDialog = (item) => {
		setSelectedTile(item);
		setOpenDialog(true);
	};

	const handleCloseDetailsDialog = () => {
		setOpenDialog(false);
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
			{console.log("Current theme passed to Scheduler:", theme)}
			<section className="schedule-container">
				<Scheduler
					key={theme}
					toggleTheme={theme}
					data={filteredSchedulerData}
					isLoading={isLoading}
					onRangeChange={handleRangeChange}
					onTileClick={(clickedResource) => {handleOpenDetailsDialog(clickedResource); console.log(clickedResource)}}
					onItemClick={(item) => { handleOpenDetailsDialog(item); console.log(item); }}
					onFilterData={() => {
						setFilterButtonState(1);
					}}
					onClearFilterData={() => {
						setFilterButtonState(0);
					}}
					config={{
						zoom: 1,
						filterButtonState,
						showThemeToggle: false,
						defaultTheme: theme === 'dark' ? 'dark' : 'light',

					}}
				/>
			</section>


			<Dialog 
				open={openDialog} 
				onClose={handleCloseDetailsDialog}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					Details
					<IconButton
						aria-label="close"
						onClick={handleCloseDetailsDialog}
						sx={{
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					{selectedTile && (
						<Box sx={{ mt: 2 }}>
							<Typography variant="h6" gutterBottom>
								{selectedTile.title}
							</Typography>
							<Divider sx={{ my: 2 }} />
							<Box sx={{ mb: 2 }}>
								<Typography variant="subtitle1" color="text.secondary">
									<strong>Start:</strong> {dayjs(selectedTile.startDate).format('MMMM D, YYYY h:mm A')}
								</Typography>
								<Typography variant="subtitle1" color="text.secondary">
									<strong>End:</strong> {dayjs(selectedTile.endDate).format('MMMM D, YYYY h:mm A')}
								</Typography>
								{selectedTile.description && (
									<Typography variant="body1" sx={{ mt: 2 }}>
										<strong>Description:</strong>
										<Box sx={{ mt: 1 }}>
											{selectedTile.description}
										</Box>
									</Typography>
								)}
							</Box>
						</Box>
					)}
				</DialogContent>
				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button 
						variant="contained" 
						color="primary" 
						startIcon={<EditIcon />}
						onClick={handleOpenEditDialog}
					>
						Edit
					</Button>
					<Button 
						variant="contained" 
						color="error" 
						startIcon={<DeleteIcon />}
						onClick={handleDeleteEvent}
					>
						Delete
					</Button>

				</DialogActions>
			</Dialog>


			{/* <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
				<DialogTitle>Edit Event</DialogTitle>
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
					<Button onClick={handleCloseEditDialog}>Cancel</Button>
					<Button onClick={handleUpdateEvent} color="primary">Save</Button>
				</DialogActions>
			</Dialog> */}
		</div>
	);
}
