import React, { useState } from "react";
import { Box, Button, TextField, Modal, Typography, Grid } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from "../Context/AuthContext";
import { ReceiptLongRounded } from "@mui/icons-material";

export default function Edit({ id, currentData }) {
	const { user } = useAuth();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		rank: "",
		email: "",
		phone: "",
		organization: "",
		crew: "",
		position: "",
		permissions: "",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleEdit = () => {
		fetch(`${API_URL}/user/${id}`, {
			method: "PATCH",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message) {
					window.location.reload();
					closeModal();
				} else {
					alert("Failed to update");
				}
			})
			.catch(() => {
				alert("Failed to update");
			});
	};

	const openModal = () => {
		setFormData({
			first_name: currentData.first_name || "",
			last_name: currentData.last_name || "",
			rank: currentData.rank || "",
			email: currentData.email || "",
			phone: currentData.phone || "",
			organization: currentData.organization || "",
			crew: currentData.crew || "",
			position: currentData.position || "",
			permissions: currentData.permissions || "",
		});
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<Button variant="contained" color="primary" onClick={openModal}>
				Edit
			</Button>

			<Modal open={isModalOpen} onClose={closeModal}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400, // Increased modal width
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography variant="h6" gutterBottom>
						Edit Item
					</Typography>
					<form onSubmit={(event) => event.preventDefault()}>
						<Grid container spacing={2} justifyContent="center">
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="First Name"
									name="first_name"
									value={formData.first_name}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Last Name"
									name="last_name"
									value={formData.last_name}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Rank"
									name="rank"
									value={formData.rank}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Duty Phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Organization"
									name="organization"
									value={formData.organization}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Crew"
									name="crew"
									value={formData.crew}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Position"
									name="position"
									value={formData.position}
									onChange={handleInputChange}
									sx={{ width: "300px" }} // Ensure full width
								/>
							</Grid>
							{user.permissions === "admin" && (
								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Role"
										name="permissions"
										value={formData.permissions}
										onChange={handleInputChange}
										sx={{ width: "300px" }} // Ensure full width
									/>
								</Grid>
							)}
						</Grid>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center", // Center buttons horizontally
								gap: 2, // Add spacing between buttons
								marginTop: 2,
								width: "100%", // Ensure buttons span the full width
							}}
						>
							<Button
								variant="contained"
								color="primary"
								onClick={handleEdit}
							>
								Submit
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={closeModal}
							>
								Cancel
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</div>
	);
}
