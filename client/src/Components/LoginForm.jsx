
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

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
      <input 
        type="text" 
        name="username" 
        placeholder="Username" 
        value={form.username} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={form.password} 
        onChange={handleChange} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;

