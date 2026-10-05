import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {

      const payload = {
        userId: 101,
        role: "Admin"
      };

      const simulatedToken = btoa(JSON.stringify(payload));

      localStorage.setItem("token", simulatedToken);
      localStorage.setItem("user", JSON.stringify(payload));

      setToken(simulatedToken);
      setUser(payload);

      alert("Login Successful!");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    setUsername("");
    setPassword("");
  };

  
  if (token && user) {
    return (
      <div className="container">
        <div className="dashboard">

          <h1>Dashboard</h1>

          <h2>Welcome, {user.role}!</h2>

          <p>
            <strong>User ID:</strong> {user.userId}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <p className="success">
            ✓ You are logged in
          </p>

          <p>
            <strong>Token:</strong>
          </p>

          <div className="token">
            {token}
          </div>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    );
  }

  // Login Page
  return (
    <div className="container">
      <div className="login-box">

        <h1>Login System</h1>

        <form onSubmit={handleLogin}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="hint">
          Demo Login: admin / 1234
        </p>

      </div>
    </div>
  );
}

export default App;