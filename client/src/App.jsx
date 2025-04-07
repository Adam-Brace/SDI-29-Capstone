
import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./Routes/LoginPage";
import RegisterPage from "./Routes/RegisterPage";
import { AuthProvider } from "./Context/AuthContext";
import "./styles/index.css"; 
import "./styles/Form.css";  

export default function App() {
  const [theme, setTheme] = useState("light");

  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.className = storedTheme + "-theme"; 
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme + "-theme";
  };

  return (
    <div className={`container ${theme}-theme`}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={toggleTheme} style={{ float: "right" }}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </nav>

      <AuthProvider>
        <Routes>
          <Route path="/" element={<div>Hello World</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
