import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider as Theme, createTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("dark");

	const updateBodyClass = (themeData) => {
		if (!["light", "dark"].includes(themeData)) {
			console.error("Invalid themeData:", themeData);
			return;
		}
		setTheme(themeData);
		document.body.classList.remove("light-theme", "dark-theme");
		document.body.classList.add(`${themeData}-theme`);
		Cookies.set("theme", themeData, { expires: 30 });
	};

	useEffect(() => {
		const themeData = Cookies.get("theme");
		if (themeData) {
			updateBodyClass(themeData);
		} else {
			updateBodyClass("dark");
		}
	}, []);

	const toggleTheme = () => {
		updateBodyClass(theme === "light" ? "dark" : "light");
	};

	return (
		<themeContext.Provider value={{ theme, toggleTheme }}>
			<Theme theme={createTheme({ palette: { mode: theme } })}>
				{children}
			</Theme>
		</themeContext.Provider>
	);
};

export const useTheme = () => useContext(themeContext);
