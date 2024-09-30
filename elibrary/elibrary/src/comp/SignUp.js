import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User signed up:', data);
        localStorage.setItem('token', data.token); // Save token to local storage
        navigate('/'); // Redirect to home after signup (and automatic login)
      } else {
        console.error('Sign up error:', data.message);
        alert(data.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="auth-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>
          
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={() => navigate('/login')}>
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
