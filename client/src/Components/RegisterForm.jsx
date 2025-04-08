
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/Form.css';

function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/users', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          
          login(data.user);
          navigate('/');
        } else {
          setError(data.error || 'Registration failed.');
        }
      })
      .catch((err) => {
        console.error('Registration error:', err);
        setError('Registration failed.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="form-control"
            placeholder="Enter your first name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="form-control"
            placeholder="Enter your last name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={form.email}
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
    </div>
  );
}

export default RegisterForm;



