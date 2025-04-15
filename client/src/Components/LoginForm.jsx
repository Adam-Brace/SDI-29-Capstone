import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch(`${API_URL}/user/login`, {
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
				if (data.user) {
					login(data.user);
					navigate(
						data.user?.permissions === "admin" ? "/admin" : "/"
					);
				} else {
					setError(data.error || "Login failed.");
				}
			})
			.catch((err) => {
				console.error("Login error:", err);
				setError("Login failed.");
			});
	};

	return (
		<Box
			sx={{
				maxWidth: 400,
				margin: "auto",
				padding: 3,
				boxShadow: 3,
				borderRadius: 2,
			}}
		>
			<Typography variant="h4" gutterBottom>
				Login
			</Typography>
			{error && <Alert severity="error">{error}</Alert>}
			<form onSubmit={handleSubmit}>
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
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ marginTop: 2 }}
				>
					Login
				</Button>
			</form>
		</Box>
	);
}

export default LoginForm;
