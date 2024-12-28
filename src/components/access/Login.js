import React, { useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ setUserData }) => {
  const navigate = useNavigate();
  const [loginWindow, setLoginWindow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [googleData, setGoogleData] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ googleData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log('Login response:', result);
      if (response.ok) {
        localStorage.setItem('userData', JSON.stringify(googleData));
        setUserData(googleData);
        setLoginWindow(false);
        navigate('/');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('InternalServerError');
    }
  }, [googleData, navigate, setUserData]);

  useEffect(() => {
    if (googleData) {
      handleLogin();
    }
  }, [googleData, handleLogin]);

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setGoogleData(decoded);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setGoogleData(null);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (googleData) {
      handleLogout();
    } else {
      setLoginWindow(true);
    }
  };

  return (
    <div className='login'>
      <br /> <br />
      <form name='regForm' id='regForm' onSubmit={(e) => e.preventDefault()}>
        <button type='button' id='login' onClick={handleButtonClick}>
          {googleData ? 'Log Out' : 'Log In'}
        </button>
        {loginWindow && (
          <div id='loginForm'>
            <span id='exit_spanLogin' onClick={() => setLoginWindow(false)}>x</span>
            <h2>Log In or Sign Up</h2>
            <div id='googleLogin'>
              <GoogleLogin theme='filled_black' shape='pill' width='25%'
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setErrorMessage('Google login failed');
                }}
              />
            </div>
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;