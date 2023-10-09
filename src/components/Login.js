// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); // State to store login error
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      // Check if the user exists (if it's registered)
      if (userCredential.user) {
        history('/dashboard'); // Redirect to the dashboard page after successful login
      } else {
        // If userCredential.user is null, the email is not registered
        setLoginError('Email is not registered. Please sign up.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Password incorrect'); // Set a generic login error message
    }
  };

  return (
 
    <div className="auth-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      {loginError && <p className="error-message">{loginError}</p>} {/* Display error message */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
