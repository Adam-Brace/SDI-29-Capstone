import React from 'react';
import LoginForm from '../../Components/LoginForm';
import '../../styles/Form.css';

function LoginPage() {
  return (
    <div className="auth-container">
      <header>
        <h2>Welcome Back!</h2>
        <p>Please log in to continue.</p>
      </header>
      <LoginForm />
      <a className="btn-link" href="/forgot-password">Forgot Password?</a>
      <br />
      <a className="btn-link" href="/register">Don't have an account? Sign up</a>
    </div>
  );
}

export default LoginPage;

