
import React from 'react';
import LoginForm from '../Components/LoginForm';

function LoginPage() {
  return (
    <div>
      <header>
        <h2>Welcome Back!</h2>
        <p>Please log in to continue.</p>
      </header>
      <LoginForm />
      <a href="/forgot-password">Forgot Password?</a>
      <a href="/register">Don't have an account? Sign up</a>
    </div>
  );
}

export default LoginPage;
