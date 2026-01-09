import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // For now just navigate to homepage
    navigate("/home"); 
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Welcome Back 👋</h2>
        <input type="text" placeholder="Email" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}
