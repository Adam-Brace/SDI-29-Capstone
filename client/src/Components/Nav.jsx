import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import UserBadge from "./UserBadge";
import { Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTheme } from "../Context/ThemeContex.jsx";

export default function Nav() {
	const { user, logout } = useAuth();
	const { theme, applyTheme } = useTheme();

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Logo theme={theme} />
			</div>
			<div className="navbar-center">
				<Link to="/" className="nav-link">
					Home
				</Link>
				<Link to="/login" className="nav-link">
					Login
				</Link>
				<Link to="/register" className="nav-link">
					Register
				</Link>
				<Link to="/profile" className="nav-link">
					Profile
				</Link>
				<Link to="/requests" className="nav-link">
					Requests
				</Link>
				{user?.permissions == "admin" && (
					<Link to="/admin" className="nav-link">
						Admin
					</Link>
				)}
			</div>
			<div className="navbar-right">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<LightModeIcon sx={{ mr: 1 }} />
						<FormControlLabel
							control={
								<Switch
									checked={theme === "dark"}
									onChange={() =>
										applyTheme(
											theme === "light" ? "dark" : "light"
										)
									}
									color="primary"
								/>
							}
							label=""
						/>
						<DarkModeIcon sx={{ ml: -2 }} />
					</Box>
					<UserBadge wh={"40px"} />
				</Box>
			</div>
		</nav>
	);
}
