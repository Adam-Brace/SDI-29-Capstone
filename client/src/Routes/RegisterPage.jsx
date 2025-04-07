import React from "react";
import RegisterForm from "../Components/RegisterForm";
import "../styles/Form.css";

function RegisterPage() {
  return (
    <div className="auth-container">
      <header>
        <h2>Create Your Account</h2>
        <p>Please fill in the information below to register.</p>
      </header>
      <RegisterForm />
      <a className="btn-link" href="/login">Already have an account? Log in</a>
      <br />
      <a className="btn-link" href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default RegisterPage;

