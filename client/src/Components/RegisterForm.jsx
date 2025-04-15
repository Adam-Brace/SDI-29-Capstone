import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		confirmPassword: "",
		rank: "",
		phone: "",
		organization: "",
		crew: "",
		position: "",
		permissions: "",
	});
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match. Please try again.");
			return;
		}

		fetch(`${API_URL}/user`, {
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(form),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === "User created") {
					login(data.user);
					alert("Account Creation Successful!");
					navigate("/");
				} else {
					setError(data.error || "Registration failed.");
				}
			})
			.catch((err) => {
				console.error("Registration error:", err);
				setError("Registration failed.");
			});
	};

	return (
		<Box
			sx={{
				maxWidth: 500,
				margin: "auto",
				padding: 3,
				boxShadow: 3,
				borderRadius: 2,
			}}
		>
			<Typography variant="h4" gutterBottom>
				Register
			</Typography>
			{error && <Alert severity="error">{error}</Alert>}
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					margin="normal"
					label="First Name"
					name="first_name"
					value={form.first_name}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Last Name"
					name="last_name"
					value={form.last_name}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Email"
					name="email"
					type="email"
					value={form.email}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Password"
					name="password"
					type="password"
					value={form.password}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					value={form.confirmPassword}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Rank"
					name="rank"
					value={form.rank}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Duty Phone#"
					name="phone"
					value={form.phone}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Organization"
					name="organization"
					value={form.organization}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Crew"
					name="crew"
					value={form.crew}
					onChange={handleChange}
					required
				/>
				<TextField
					fullWidth
					margin="normal"
					label="Position"
					name="position"
					value={form.position}
					onChange={handleChange}
					required
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ marginTop: 2 }}
				>
					Register
				</Button>
			</form>
		</Box>
	);
}

export default RegisterForm;
