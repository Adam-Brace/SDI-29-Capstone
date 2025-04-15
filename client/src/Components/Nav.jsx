import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import UserBadge from "./UserBadge";
import { Box } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { FormControlLabel, Menu, MenuItem } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useTheme } from "../Context/ThemeContext.jsx";
import { useState } from "react";

export default function Nav() {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);

	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<nav className="navbar">
			<div className="navbar-left">
				<Logo />
			</div>
			<div className="navbar-center">
				{user && (
					<Link to="/" className="nav-link">
						Home
					</Link>
				)}
				{user?.permissions === "admin" && (
					<Link to="/admin" className="nav-link">
						Admin
					</Link>
				)}
				{user?.permissions !== "admin" && (
					<Link to="/admin" className="nav-link">
						My Requests
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
									onChange={toggleTheme}
									color="primary"
								/>
							}
							label=""
							sx={{
								marginRight: 0,
							}}
						/>
						<DarkModeIcon sx={{ ml: 1 }} />
					</Box>
					<UserBadge
						id={null}
						wh={"40px"}
						onClick={(event) => {
							user
								? setAnchorEl(event.currentTarget)
								: navigate("/login");
						}}
					/>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem
							onClick={() => {
								handleClose();
								navigate("/profile");
							}}
						>
							Profile
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
								logout();
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</div>
		</nav>
	);
}
