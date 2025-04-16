import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../Components/RegisterForm";
import {
	Box,
	Typography,
	Link as MuiLink,
	Card,
	CardContent,
} from "@mui/material";

function RegisterPage() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: 3,
			}}
		>
			<Card
				sx={{
					maxWidth: 400,
					width: "100%",
					boxShadow: 3,
					borderRadius: 2,
				}}
			>
				<CardContent>
					<Box
						sx={{
							textAlign: "center",
							marginBottom: 3,
						}}
					>
						<Typography variant="h4" gutterBottom>
							Create Your Account
						</Typography>
						<Typography variant="body1" color="textSecondary">
							Please fill in the information below to register.
						</Typography>
					</Box>
					<RegisterForm />
					<Box sx={{ marginTop: 2, textAlign: "center" }}>
						<MuiLink
							component={Link}
							to="/login"
							underline="hover"
							variant="body2"
						>
							Already have an account? Log in
						</MuiLink>
						<br />
						<MuiLink
							component={Link}
							to="/forgot-password"
							underline="hover"
							variant="body2"
						>
							Forgot Password?
						</MuiLink>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}

export default RegisterPage;
