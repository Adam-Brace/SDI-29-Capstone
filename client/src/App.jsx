
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
import { AuthProvider } from "./Context/AuthContext";	


	

export default function App() {
	return (
		<div className="container">
			<nav>
				<Link to="/">Home Page</Link>
				<Link to="/login">Login Page</Link>
				<Link to="/register">Register Page</Link>
			</nav>
		<AuthProvider>
			<Routes>
				<Route path="/" element={<div>Hello World</div>} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</AuthProvider>
	</div>
	);
}