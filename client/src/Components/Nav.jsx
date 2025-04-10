export default function Nav() {
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
						/>
						<DarkModeIcon sx={{ ml: -2 }} />
					</Box>
					<UserBadge user={sampleUser} />
				</Box>
			</div>
		</nav>
	);
}
