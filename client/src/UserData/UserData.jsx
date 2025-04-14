
import { useEffect, useState } from "react";
import Edit from "./Edit";
import "./UserData.css";
const API_URL = import.meta.env.VITE_API_URL;

import { useAuth } from '../Context/AuthContext';
import '../styles/Form.css';


import { useAuth } from "../Context/AuthContext";

export default function UserData() {
	const [userdata, setUserdata] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		if (!user || !user.id) return;
		fetch(`${API_URL}/user/${user.id}`)
			.then((res) => res.json())
			.then((data) => {
				// console.log('fetched data:', data)
				// console.log(user.id)
				setUserdata(data);
			})
			.catch((err) => console.error(err));
	}, [user]);

	return (
		<>
			<h1 className="user-name">
				{userdata.length > 0
					? `${userdata[0].rank} ${userdata[0].last_name}'s Profile`
					: "Loading..."}
			</h1>



  return (
    <>
    <h1 className="user-name">{userdata.length > 0 ? `${userdata[0].rank} ${userdata[0].last_name}'s Profile` : "Loading..."}</h1>

    <div className="auth-container">
        <ul className="user-list">
          {userdata.length == 0 ? (
            <li className="error-message">Error. No User Data Found</li>
          ) : (
          userdata.map(user => (
            <li key={user.id} className="user-card">
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Last Name:</strong> {user.last_name}</p>
              <p><strong>Rank:</strong> {user.rank}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Duty Phone #:</strong> {user.phone}</p>
              <p><strong>Organization:</strong> {user.organization}</p>
              <p><strong>Crew:</strong> {user.crew}</p>
              <p><strong>Position:</strong> {user.position}</p>
              <p><strong>Role:</strong> {user.permissions}</p>
        <div className='edit-container'>
        <Edit id={user.id} currentData={{...user}}/>
        </div>
              </li>
          ))
        )}
        </ul>
      </div>

    </>
  )
}

