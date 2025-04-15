import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userData = Cookies.get("user");
		if (userData) {
			try {
				setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Error parsing user data from cookies:", error);
				Cookies.remove("user");
			}
		}
		setLoading(false);
	}, []);

	const login = (userData) => {
		Cookies.set("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		Cookies.remove("user");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, setUser, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
