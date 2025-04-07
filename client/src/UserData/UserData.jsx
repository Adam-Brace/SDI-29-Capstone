import { useEffect, useState } from 'react';
import Edit from './Edit'
import './UserData.css';

export default function UserData() {

  const [userdata, setUserdata] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:3001/user/1`)
      .then(res=>res.json())
      .then(data => {
        // console.log('fetched data:', data)
        setUserdata(data)
  })
      .catch(err=>console.error(err))
  }, [])



  return (
    <>
    <h1>{userdata.length > 0 ? `${userdata[0].rank} ${userdata[0].last_name}'s Profile` : "Loading..."}</h1>

    <div className="user-data-box">
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