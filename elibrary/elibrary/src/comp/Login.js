import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User logged in:", data);
        localStorage.setItem('token', data.token); // Save token if you are using JWT
        navigate('/'); // Redirect to home after login
      } else {
        console.error("Login error:", data.message);
        alert(data.message || 'Login failed. Please try again.'); // Notify the user
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="auth-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 align='center'>Login to Your Account</h2>
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          <p>
            Don't have an account?{" "}
            <span className="link" style={{color:'#16423C'}} onClick={() => navigate('/signup')}>
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
