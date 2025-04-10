import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
import Admin from "./Routes/Admin.jsx";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import "./styles/index.css";
import "./styles/Form.css";
import UserData from "./UserData/UserData";
import Schedule from "./Components/Schedule";
import HomePage from "./Routes/HomePage";
import UserBadge from "./Components/UserBadge";
import NotFound from "./Components/NotFound";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Logo from "./Components/Logo.jsx";



export default function App() {

	const {logout} = useAuth()
	const {user} = useAuth()

	const sampleUser = {
		rank: "Capt",
		firstName: "Jane",
		lastName: "Doe",
	};
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		setTheme(storedTheme);
		document.body.className = storedTheme + "-theme";
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.body.className = newTheme + "-theme";
	};

	return (
		<div className={`container ${theme}-theme`}>
			<nav className="navbar">
				<div className="navbar-left">
					<Logo theme={theme} />
				</div>
				<div className="navbar-center">
					<Link to="/" className="nav-link">Home</Link>
					<Link to="/login" className="nav-link">Login</Link>
					<Link to="/register" className="nav-link">Register</Link>
					<Link to="/profile" className="nav-link">Profile</Link>
				</div>
				<div className="navbar-right">
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 2
					}}>
						<Box sx={{
							display: 'flex',
							alignItems: 'center'
						}}>
							<LightModeIcon sx={{ mr: 1 }} />
							<FormControlLabel
								control={
									<Switch
										checked={theme === 'dark'}
										onChange={toggleTheme}
										color="primary"
									/>
								}
								label=""
							/>
							<DarkModeIcon sx={{ ml: -2 }} />
						</Box>
						<UserBadge/>
					</Box>
					<button onClick={logout}>Log Out</button>
				</div>
			</nav>
				<Routes>
					<Route path="/" element={<HomePage theme={theme} />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/profile" element={<UserData />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
		</div>
	);
}
