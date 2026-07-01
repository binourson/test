import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../api.js";

function LoginPage() {
  // One state variable per input (controlled inputs).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // lets us redirect in code

  async function handleSubmit(event) {
    event.preventDefault(); // stop the browser from doing a full-page reload
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // turn the JS object into a JSON string
      });
      const data = await response.json();

      if (!response.ok) {
        // the backend sent an error (e.g. 401) -> data.error holds the message
        throw new Error(data.error || "Login failed");
      }

      // success: save the token, then go to the home page
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
