import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../styles/MyRequests.css';

function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const isTesting = true; // ← Toggle this to false to use real fetch

  useEffect(() => {
    const fetchUserRequests = async () => {
      if (isTesting) {
        // Dummy data
        const dummyData = [
          {
            chatId: 101,
            title: 'Mock Meeting',
            description: 'Discuss test cases',
            startDate: '2025-04-10T10:00:00Z',
            endDate: '2025-04-10T11:00:00Z',
            status: 'approved',
          },
          {
            chatId: 102,
            title: 'Planning Session',
            description: 'Feature roadmap discussion',
            startDate: '2025-04-12T13:00:00Z',
            endDate: '2025-04-12T14:30:00Z',
            status: 'pending',
          },
        ];
        setRequests(dummyData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/events/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch requests');

        const data = await response.json();
        setRequests(data.data);
      } catch (error) {
        console.error('Error fetching user requests:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id || isTesting) {
      fetchUserRequests();
    }
  }, [user]);

  return (
    <div className="request-container">
      <h2>Your Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>Chat ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.chatId}</td>
                <td>{req.title}</td>
                <td>{req.description}</td>
                <td>{new Date(req.startDate).toLocaleString()}</td>
                <td>{new Date(req.endDate).toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${req.status?.toLowerCase() || 'pending'}`}>
                    {req.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRequests;
