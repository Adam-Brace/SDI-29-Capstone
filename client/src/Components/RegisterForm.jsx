import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
import "../styles/Form.css";

function RegisterForm() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		rank: "",
		phone: "",
		organization: "",
		crew: "",
		position: "",
		permissions: "",
	});
	const [error, setError] = useState("");


	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

    fetch(`${API_URL}/user`, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "User created") {
                    login(data.user);
                    alert("Account Creation Successful!");
                    navigate("/");
                } else {
                    console.log(data);
                    setError(data.error || "Registration failed.");
                }
            })
            .catch((err) => {
                console.error("Registration error:", err);
                setError("Registration failed.");
            });
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <div className="alert">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="first_name">
                        First Name
                    </label>
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
                    <label className="form-label" htmlFor="last_name">
                        Last Name
                    </label>
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
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
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
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
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
                <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Re-enter your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="rank">
                        Rank
                    </label>
                    <input
                        type="text"
                        name="rank"
                        id="rank"
                        className="form-control"
                        placeholder="Enter your rank"
                        value={form.rank}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                        Duty Phone#
                    </label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="form-control"
                        placeholder="Enter your duty phone number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="organization">
                        Organization
                    </label>
                    <input
                        type="text"
                        name="organization"
                        id="organization"
                        className="form-control"
                        placeholder="Enter your organization"
                        value={form.organization}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="crew">
                        Crew
                    </label>
                    <input
                        type="text"
                        name="crew"
                        id="crew"
                        className="form-control"
                        placeholder="Enter your crew"
                        value={form.crew}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="position">
                        Position
                    </label>
                    <input
                        type="text"
                        name="position"
                        id="position"
                        className="form-control"
                        placeholder="Enter your position"
                        value={form.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Register
                </button>
            </form>
        </div>
    );

}

export default RegisterForm;
