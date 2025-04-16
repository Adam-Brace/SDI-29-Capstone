import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import UserBadge from "./UserBadge";
import {
	AppBar,
	Toolbar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Switch,
	FormControlLabel,
	Button,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "../Context/ThemeContext.jsx";

export default function Nav() {
	const { user, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);

	const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMobileMenuClose = () => {
		setMobileMenuAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMenuAnchorEl(event.currentTarget);
	};

	return (
		<AppBar position="static" color="default" sx={{ boxShadow: 3 }}>
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{/* Left Section: Logo */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Logo />
				</Box>

				{/* Center Section: Links */}
				<Box
					sx={{
						display: { xs: "none", md: "flex" },
						gap: 2,
						alignItems: "center",
					}}
				>
					{user && (
						<Button
							component={Link}
							to="/"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							Home
						</Button>
					)}
					{user?.permissions === "admin" && (
						<Button
							component={Link}
							to="/admin"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							Admin
						</Button>
					)}
					{user?.permissions !== "admin" && (
						<Button
							component={Link}
							to="/requests"
							color="inherit"
							sx={{ textTransform: "none" }}
						>
							My Requests
						</Button>
					)}
				</Box>

				{/* Right Section: Theme Toggle and User Menu */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 2,
					}}
				>
					{/* Theme Toggle */}
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

					{/* User Badge */}
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

					{/* Mobile Menu Icon */}
					<IconButton
						edge="end"
						color="inherit"
						aria-label="menu"
						sx={{ display: { xs: "flex", md: "none" } }}
						onClick={handleMobileMenuOpen}
					>
						<MenuIcon />
					</IconButton>
				</Box>
			</Toolbar>

			{/* Mobile Menu */}
			<Menu
				anchorEl={mobileMenuAnchorEl}
				open={Boolean(mobileMenuAnchorEl)}
				onClose={handleMobileMenuClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				{user && (
					<MenuItem
						onClick={() => {
							handleMobileMenuClose();
							navigate("/");
						}}
					>
						Home
					</MenuItem>
				)}
				{user?.permissions === "admin" && (
					<MenuItem
						onClick={() => {
							handleMobileMenuClose();
							navigate("/admin");
						}}
					>
						Admin
					</MenuItem>
				)}
				{user?.permissions !== "admin" && (
					<MenuItem
						onClick={() => {
							handleMobileMenuClose();
							navigate("/requests");
						}}
					>
						My Requests
					</MenuItem>
				)}
			</Menu>
		</AppBar>
	);
}
