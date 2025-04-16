import { useEffect, useState } from "react";
import Edit from "./Edit";
import { useAuth } from "../Context/AuthContext";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Grid,
	Button,
	Alert,
	CircularProgress,
} from "@mui/material";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserData() {
	const [userdata, setUserdata] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (!user || !user.id) return;
		fetch(`${API_URL}/user/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				setUserdata(data);
			})
			.catch((err) => console.error(err));
	}, [user]);

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom align="center">
				{userdata.length > 0
					? `${userdata[0].rank} ${userdata[0].last_name}'s Profile`
					: "Loading..."}
			</Typography>

			<Box sx={{ mt: 3 }}>
				{userdata.length === 0 ? (
					<Alert severity="error" sx={{ textAlign: "left" }}>
						Error. No User Data Found
					</Alert>
				) : (
					<Grid container spacing={3} justifyContent="center">
						{userdata.map((user) => (
							<Grid item xs={12} sm={8} md={6} key={user.id}>
								<Card
									variant="outlined"
									style={{ width: "500px" }}
								>
									<CardContent>
										<Typography variant="h6" gutterBottom>
											User Details
										</Typography>
										<Typography>
											<strong>First Name:</strong>{" "}
											{user.first_name}
										</Typography>
										<Typography>
											<strong>Last Name:</strong>{" "}
											{user.last_name}
										</Typography>
										<Typography>
											<strong>Rank:</strong> {user.rank}
										</Typography>
										<Typography>
											<strong>Email:</strong> {user.email}
										</Typography>
										<Typography>
											<strong>Duty Phone #:</strong>{" "}
											{user.phone}
										</Typography>
										<Typography>
											<strong>Organization:</strong>{" "}
											{user.organization}
										</Typography>
										<Typography>
											<strong>Crew:</strong> {user.crew}
										</Typography>
										<Typography>
											<strong>Position:</strong>{" "}
											{user.position}
										</Typography>
										<Typography>
											<strong>Role:</strong>{" "}
											{user.permissions}
										</Typography>
										<Box
											sx={{ mt: 5, textAlign: "center" }}
										>
											<Edit
												id={user.id}
												currentData={{ ...user }}
											/>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
}
