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

	const updateBodyClass = (themeData) => {
		if (!["light", "dark"].includes(themeData)) {
			console.error("Invalid themeData:", themeData);
			return;
		}
		console.log("Before update:", document.body.classList);
		document.body.classList.remove("light-theme", "dark-theme");
		document.body.classList.add(`${themeData}-theme`);
		console.log("After update:", document.body.classList);
		Cookies.set("theme", themeData, { expires: 30 });
	};

	useLayoutEffect(() => {
		const themeData = Cookies.get("theme");
		if (themeData) {
			setTheme(themeData);
			updateBodyClass(themeData);
		} else {
			updateBodyClass("dark");
		}
	}, []);

	const applyTheme = (themeData) => {
		setTheme(themeData);
		updateBodyClass(themeData);
	};

	return (
		<themeContext.Provider value={{ theme, applyTheme }}>
			{children}
		</themeContext.Provider>
	);
};

export const useTheme = () => useContext(themeContext);
