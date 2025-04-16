import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../Components/LoginForm";
import {
	Box,
	Typography,
	Link as MuiLink,
	Card,
	CardContent,
} from "@mui/material";

function LoginPage() {
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
							Welcome Back!
						</Typography>
						<Typography variant="body1" color="textSecondary">
							Please log in to continue.
						</Typography>
					</Box>
					<LoginForm />
					<Box sx={{ marginTop: 2, textAlign: "center" }}>
						<MuiLink
							component={Link}
							to="/forgot-password"
							underline="hover"
							variant="body2"
						>
							Forgot Password?
						</MuiLink>
						<br />
						<MuiLink
							component={Link}
							to="/register"
							underline="hover"
							variant="body2"
						>
							Don't have an account? Sign up
						</MuiLink>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}

export default LoginPage;
