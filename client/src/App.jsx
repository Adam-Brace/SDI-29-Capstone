import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
import Admin from "./Routes/Admin.jsx";
import { useAuth } from "./Context/AuthContext";
import MyRequests from "./Routes/MyRequests.jsx";
import "./styles/Form.css";
import UserData from "./UserData/UserData";
import Schedule from "./Components/Schedule/Schedule";
import HomePage from "./Routes/HomePage";
import UserBadge from "./Components/UserBadge";
import NotFound from "./Components/NotFound";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Logo from "./Components/Logo.jsx";
import Nav from "./Components/Nav.jsx";

export default function App() {
	const { logout } = useAuth();
	const { user } = useAuth();

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
		<>
			<Nav />
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/profile" element={<UserData />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
