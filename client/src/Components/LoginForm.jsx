
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/Form.css';

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(form)
      .then((response) => {
        login(response.data.user);
        navigate('/');
      })
      .catch((err) => {
        setError(err.response?.data?.error || 'Login failed.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert">{error}</div>}
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
      <button type="submit" className="btn-primary">Login</button>
    </form>
  );
}

export default LoginForm;

