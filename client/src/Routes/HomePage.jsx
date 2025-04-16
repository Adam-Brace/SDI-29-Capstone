import React, { useEffect } from "react";
import Schedule from "../Components/Schedule/Schedule.jsx";
import "../styles/HomePage.css";

function HomePage() {
	useEffect(() => {
		document.body.style.backgroundColor = "rgb(22, 27, 34)";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

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
