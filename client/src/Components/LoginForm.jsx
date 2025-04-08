
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import '../styles/Form.css';

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/users/login', {
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
          setError(data.error || 'Login failed.');
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError('Login failed.');
      });
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;


