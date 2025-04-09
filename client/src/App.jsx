import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
import Admin from "./Routes/Admin.jsx";
import { AuthProvider } from "./Context/AuthContext";
import "./styles/index.css";
import "./styles/Form.css";

import UserData from "./UserData/UserData";
import Schedule from "./Components/Schedule";
import HomePage from "./Routes/HomePage";
import UserBadge from "./Components/UserBadge";
import NotFound from "./Components/NotFound";

export default function App() {
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
			<nav>
				<UserBadge user={sampleUser} />
				<Link to="/">Home</Link>
				<Link to="/login">Login</Link>
				<Link to="/register">Register</Link>
				<Link to="/profile">Profile Page</Link>
				<button onClick={toggleTheme} style={{ float: "right" }}>
					Switch to {theme === "light" ? "Dark" : "Light"} Mode
				</button>
			</nav>

			<AuthProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/profile" element={<UserData />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}
