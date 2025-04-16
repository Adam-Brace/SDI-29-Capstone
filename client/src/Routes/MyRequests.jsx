import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../styles/MyRequests.css';

function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3001/events/schedule/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch requests');
        const data = await response.json();
        setRequests(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchRequests();
  }, [user]);

  return (
    <>
      <h2 className="top-heading">Your Requests</h2>
      <div className="request-container">
        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.title}</td>
                  <td>{req.description}</td>
                  <td>{new Date(req.startDate).toLocaleString()}</td>
                  <td>{new Date(req.endDate).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${req.status?.toLowerCase() || 'pending'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>{req.userMessage || 'No message was submitted.'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default MyRequests;