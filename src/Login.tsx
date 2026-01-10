import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const AUTH_KEY = "isAuthenticated";
const VALID_USERNAME = "ezekiel saji";
const VALID_PASSWORD = "password";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already authenticated, redirect to home
    try {
      const auth = localStorage.getItem(AUTH_KEY);
      if (auth === "true") navigate("/home");
    } catch (e) {
      // ignore
    }
  }, [navigate]);

  const handleLogin = () => {
    setError(null);
    const normalizedUser = username.trim().toLowerCase();
    if (normalizedUser === VALID_USERNAME && password === VALID_PASSWORD) {
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch (e) {
        // ignore storage errors
      }
      navigate("/home");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue</p>

        <div className="field">
          <input value={username} onChange={(e) => setUsername((e.target as HTMLInputElement).value)} type="text" required />
          <label>Username</label>
        </div>

        <div className="field">
          <input value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} type="password" required />
          <label>Password</label>
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
