import React, { useEffect } from "react";
import Schedule from "../Components/Schedule/Schedule.jsx";
import "../styles/HomePage.css";
import { useTheme } from "../Context/ThemeContext.jsx";

function HomePage() {
	const { theme } = useTheme();
	useEffect(() => {
		theme === "dark"
			? (document.body.style.backgroundColor = "rgb(22, 27, 34)")
			: (document.body.style.backgroundColor = "rgb(255, 255, 255)");
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, [theme]);

	return (
		<div>
			<div>
				<div className="schedule-container">
					<Schedule />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
