import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("Signing up with", { name, email, password });
    navigate('/'); // Redirect to home after signup
  };

  return (
    <div className="login-page-container">
      <div className="auth-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create  your Account</h2>
        
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
