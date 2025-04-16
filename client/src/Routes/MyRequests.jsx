import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import '../styles/MyRequests.css';

function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    userMessage: '',
  });

  // Fetch events
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

  // Open modal and set form data
  const handleOpen = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: new Date(event.startDate).toISOString().slice(0, 16),
      endDate: new Date(event.endDate).toISOString().slice(0, 16),
      userMessage: event.userMessage || '',
    });
    setOpen(true);
  };

  // Close modal
  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setFormData({ title: '', description: '', startDate: '', endDate: '', userMessage: '' });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/events/${selectedEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          user_message: formData.userMessage, // Match backend field name
        }),
      });
      if (!response.ok) throw new Error('Failed to update event');
      const updatedEvent = await response.json();

      // Update the requests state
      setRequests((prev) =>
        prev.map((req) =>
          req.id === updatedEvent.id
            ? {
                ...req,
                title: updatedEvent.title,
                description: updatedEvent.description,
                startDate: updatedEvent.start_date,
                endDate: updatedEvent.end_date,
                userMessage: updatedEvent.user_message,
              }
            : req
        )
      );
      handleClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update event');
    }
  };

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
                <th>Request</th>
                <th>Description</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Message</th>
                <th>Edit</th>
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
                  <td>{req.userMessage || 'No message'}</td>
                  <td>
                    <IconButton onClick={() => handleOpen(req)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Event
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Request"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Message"
              name="userMessage"
              value={formData.userMessage}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default MyRequests;