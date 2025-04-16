
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Routes/LoginPage/LoginPage";
import RegisterPage from "./Routes/RegisterPage/RegisterPage";
import Admin from "./Routes/Admin/Admin.jsx";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Context/ProtectedRoute.jsx";
import "./styles/Form.css";
import UserData from "./UserData/UserData";
import NotFound from "./Components/NotFound";
import HomePage from "./Routes/HomePage";
import Nav from "./Components/Nav.jsx";
import MyRequests from "./Routes/MyRequests.jsx";
import SimpleResetPassword from "./Components/SimpleResetPassword"; // New import

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

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.className = storedTheme + "-theme";
  }, []);

	return (
		<>
			<Nav />
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute admin={false}>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute admin={false}>
							<UserData />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute admin={false}>
							<Admin />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/myrequests"
					element={
						<ProtectedRoute admin={false}>
							<Admin />
						</ProtectedRoute>
					}
				/>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
        <Route path="/requests" element={<MyRequests />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
