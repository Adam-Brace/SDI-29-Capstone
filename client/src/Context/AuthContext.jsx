import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userData = Cookies.get("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
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
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
