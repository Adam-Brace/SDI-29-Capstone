
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/Form.css';

function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form)
      .then((response) => {
        login(response.data);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Registration failed.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert">{error}</div>}
      <div className="form-group">
        <label className="form-label" htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="form-control"
          placeholder="Enter your first name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="form-control"
          placeholder="Enter your last name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          className="form-control"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn-primary">Register</button>
    </form>
  );
}

export default RegisterForm;
