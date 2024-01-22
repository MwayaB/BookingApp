// Login.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real-world scenario, you would typically make an API request to authenticate the user
    // For simplicity, this example logs the username and password to the console
    console.log('Login clicked with username:', username, 'and password:', password);

    // Assume login is successful for demonstration purposes
    // In a real app, you would perform actual authentication and handle the result accordingly
    const loginSuccessful = true;

    if (loginSuccessful) {
      // Redirect to the booking list page
      navigate('/booking-list');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
