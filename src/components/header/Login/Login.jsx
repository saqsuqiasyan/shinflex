import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('lang'));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(isLogin
          ? 'https://shinflex.am/SFApi/LoginP/'
          : 'https://shinflex.am/SFApi/RegisterP/'
        );
        const result = await response.json();
        setData(result);
        setLoading(false);        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isLogin]);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        const token = result.access;
        const userFirstName = result.user?.first_name || 'Guest';

        localStorage.setItem('token', token || 'NoToken');
        localStorage.setItem('name', userFirstName);

        navigate('/');
        window.location.reload();
      } else {
        const errorMessage = result.detail || `Failed to ${isLogin ? 'login' : 'register'}.`;
        setError(errorMessage);
      }
    } catch (error) {
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

  if (loading) return;

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
              placeholder={`${handleGetData(lang, [data[0].fname_en, data[0].fname_ru, data[0].fname_hy])}`}
              className="auth-input"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={`${handleGetData(lang, [data[0].lname_en, data[0].lname_ru, data[0].lname_hy])}`}
              className="auth-input"
            />
          </>
        )}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`${handleGetData(lang, [data[0].email_en, data[0].email_ru, data[0].email_hy])}`}
          className="auth-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`${handleGetData(lang, [data[0].password_en, data[0].password_ru, data[0].password_hy])}`}
          className="auth-input"
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={`${handleGetData(lang, [data[0].con_password_en, data[0].con_password_ru, data[0].con_password_hy])}`}
            className="auth-input"
          />
        )}
        <button type="submit" className="auth-button">
          {handleGetData(lang, [data[0].button_en, data[0].button_ru, data[0].button_hy])}
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