import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch('https://shinflex.am/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData, 
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <a href="/forgot-password" className="forgot-password">Forgot your password?</a>
        <button type="submit" className="login-button">Sign in</button>
      </form>
      <div className="signup">
        <p>No account? <a href="/signup">Create one here</a></p>
      </div>
    </div>
  );
};

export default Login;
