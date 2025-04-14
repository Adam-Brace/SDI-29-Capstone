import React, {
	createContext,
	useState,
	useContext,
	useLayoutEffect,
} from "react";
import Cookies from "js-cookie";

const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("dark");

	const updateBodyClass = () => {
		if (!["light", "dark"].includes(theme)) {
			console.error("Invalid themeData:", theme);
			return;
		}
		//console.log("Updating body class to:", theme);
		document.body.classList.remove("light-theme", "dark-theme");
		document.body.classList.add(`${theme}-theme`);
		Cookies.set("theme", theme, { expires: 30 });
	};

	useLayoutEffect(() => {
		const themeData = Cookies.get("theme");
		if (themeData) {
			setTheme(themeData);
			updateBodyClass();
		} else {
			setTheme("dark");
			updateBodyClass("dark");
		}
	}, []);

	const toggleTheme = () => {
		console.log("Updating body class to:", theme);
		setTheme(theme === "light" ? "dark" : "light");
		updateBodyClass();
	};

	return (
		<themeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</themeContext.Provider>
	);
};

export const useTheme = () => useContext(themeContext);
