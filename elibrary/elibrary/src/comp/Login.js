import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with", { email, password });
    navigate('/'); // Redirect to home after login
  };

  return (
    <div className="login-page-container">
      <div className="auth-form-container" >
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 align='center'>login your account</h2>
          
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
