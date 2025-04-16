
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

function SimpleResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

   
    fetch(`${API_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        newPassword: form.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Password successfully reset. Please log in with your new password.");
          setError("");
          
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setError(data.error || "Reset password failed.");
          setMessage("");
        }
      })
      .catch((err) => {
        console.error("Reset password error:", err);
        setError("Reset password failed.");
        setMessage("");
      });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
}

export default SimpleResetPassword;
