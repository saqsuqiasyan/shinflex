import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
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

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const requestData = isLogin
      ? { email, password }
      : {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password2: confirmPassword,
      };

    const url = isLogin
      ? 'https://shinflex.am/login/'
      : 'https://shinflex.am/register/';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const contentType = response.headers.get('Content-Type');

      if (response.ok && contentType.includes('application/json')) {
        const result = await response.json();

        const userFirstName = result.data ? result.data.first_name : null;

        localStorage.setItem('name', userFirstName ? userFirstName : 'Guest');
        
        navigate('/');
        window.location.reload();
      } else {
        const errorMessage = contentType.includes('application/json')
          ? (await response.json()).detail || `Failed to ${isLogin ? 'login' : 'register'}.`
          : `Failed to ${isLogin ? 'login' : 'register'}. Server returned an invalid response.`;
        setError(errorMessage);
      }
    } catch (error) {
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className="auth-container">
      <h2 style={{ marginBottom: '20px' }}>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="auth-input"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="auth-input"
            />
          </>
        )}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="auth-input"
          />
        )}
        <button type="submit" className="auth-button">
          {isLogin ? 'Sign in' : 'Sign up'}
        </button>
      </form>
      <div className="signup">
        <p>
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? 'Create one here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
