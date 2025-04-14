import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useTheme } from "../Context/ThemeContex.jsx";

export default function Logo() {
	const { theme } = useTheme();

	const logoSrc = theme === "dark" ? "/Fall-In.png" : "/Fall-In-Light.png";

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Link to="/" style={{ textDecoration: "none" }}>
				<img
					src={logoSrc}
					alt="Fall-In Logo"
					style={{
						height: "70px",
						width: "auto",
					}}
				/>
			</Link>
		</Box>
	);
}
