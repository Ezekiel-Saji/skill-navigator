import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to homepage after login
    navigate("/home");
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        <div className="field">
          <input type="email" required />
          <label>Email</label>
        </div>

        <div className="field">
          <input type="password" required />
          <label>Password</label>
        </div>

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
