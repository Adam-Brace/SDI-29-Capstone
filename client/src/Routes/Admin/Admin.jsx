import React, { useEffect, useState } from "react";
import Edit from "../../UserData/Edit";
import "../../styles/Admin.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/user")
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
              <div>
                <p>
                  <strong>
                    {user.rank} {user.first_name} {user.last_name}
                  </strong>
                </p>
                <p>{user.email}</p>
              </div>

              <button
                className="admin-dropdown-btn"
                onClick={() => handleEditClick(user)}
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
              {selectedUser.rank} {selectedUser.first_name}{" "} {selectedUser.last_name}'s Options:
            </h1>
            <Edit id={selectedUser.id} currentData={selectedUser} />
          </div>
        ) : (
          <div className="admin-placeholder">
            <p>Click a user's<b> '≡' </b>to edit their details</p>
          </div>
        )}
      </main>
    </div>
  );
}