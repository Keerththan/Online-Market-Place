import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/backend/api/Home/Login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          localStorage.setItem('companyName', response.data.company_name); // Save company name to local storage
          setMessage('Login successful');
          setMessageType('success');
          setTimeout(() => navigate('/dashboard'), 2000); // Redirect to the dashboard page
        } else {
          setMessage(result.message || 'Login failed');
          setMessageType('error');
        }
      } else {
        console.error('Failed to login');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="wrapper login">
      <div className="form-box login">
        {message && <div className={`message ${messageType}`}>{message}</div>}
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className='icon' />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className='icon' />
          </div>
          <div className="remember-forgot">
            <label><input type='checkbox' /> Remember me</label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <button type='submit'>Login</button>
          <div className='register-link'>
            <p>Don't have an account?<Link to="/register"> Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
