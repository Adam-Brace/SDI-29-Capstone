
import React from "react";
import RegisterForm from "../Components/RegisterForm";


function RegisterPage() {
  return (
    <div>
      <header>
        <h2>Create Your Account</h2>
        <p>Please fill in the information below to register.</p>
      </header>
      <RegisterForm />
      <a href="/login">Already have an account? Log in</a>
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default RegisterPage;
