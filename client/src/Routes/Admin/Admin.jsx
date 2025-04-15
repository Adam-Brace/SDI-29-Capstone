import React, { useEffect, useState } from "react";
import Edit from "../../UserData/Edit";
import UserBadge from "../../Components/UserBadge";
import "../../styles/Admin.css";
import { Margin } from "@mui/icons-material";
const API_URL = import.meta.env.VITE_API_URL;

export default function Admin() {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/user`)
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
				setFilteredUsers(data);
			})
			.catch((err) => console.error("Error fetching users:", err));
	}, []);

	const handleSearchChange = (event) => {
		const term = event.target.value.toLowerCase();
		setSearchTerm(term);
		setFilteredUsers(
			users.filter(
				(user) =>
					user.first_name.toLowerCase().includes(term) ||
					user.last_name.toLowerCase().includes(term) ||
					user.rank.toLowerCase().includes(term) ||
					user.email.toLowerCase().includes(term)
			)
		);
	};

	const handleEditClick = (user) => {
		setSelectedUser(user);
	};

	return (
		<div className="admin-container">
			<aside className="admin-sidebar">
				<h2 className="admin-seperate-section-header">Users</h2>
				<input
					type="text"
					className="admin-search-bar"
					placeholder="Search users by name, rank, or email"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<ul className="admin-user-list">
					{filteredUsers.map((user) => (
						<li key={user.id} className="admin-user-card">
							<div style={{ marginRight: "10px" }}>
								<UserBadge wh={"40px"} id={user.id} />
							</div>
							<div>
								<p>
									<strong>
										{user.rank} {user.first_name}{" "}
										{user.last_name}
									</strong>
								</p>
								<p>{user.email}</p>
							</div>

							<button
								className="admin-dropdown-btn"
								onClick={() => handleEditClick(user)}
								style={{
									marginLeft: "auto",
								}}
							>
								≡
							</button>
						</li>
					))}
				</ul>
			</aside>

			<main className="admin-main">
				{selectedUser ? (
					<div className="admin-user-details">
						<h1>
							{selectedUser.rank} {selectedUser.first_name}{" "}
							{selectedUser.last_name}'s Options:
						</h1>
						<ul>
							<li style={{ textAlign: "left" }}>
								First Name: {selectedUser.first_name}
							</li>
							<li style={{ textAlign: "left" }}>
								Last Name: {selectedUser.last_name}
							</li>
							<li style={{ textAlign: "left" }}>
								Rank: {selectedUser.rank}
							</li>
							<li style={{ textAlign: "left" }}>
								Email: {selectedUser.email}
							</li>
							<li style={{ textAlign: "left" }}>
								Duty Phone: {selectedUser.duty_phone}
							</li>
							<li style={{ textAlign: "left" }}>
								Organization: {selectedUser.organization}
							</li>
							<li style={{ textAlign: "left" }}>
								Crew: {selectedUser.crew}
							</li>
							<li style={{ textAlign: "left" }}>
								Position: {selectedUser.position}
							</li>
							<li style={{ textAlign: "left" }}>
								Role: {selectedUser.permissions}
							</li>
						</ul>

						<Edit id={selectedUser.id} currentData={selectedUser} />
					</div>
				) : (
					<div className="admin-placeholder">
						<p>
							Click a user's<b> '≡' </b>to edit their details
						</p>
					</div>
				)}
			</main>
		</div>
	);
}
