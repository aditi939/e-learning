
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase';
import '../../src/style/signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const history = useNavigate();

  const handleSignup = async () => {
    try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setSignupMessage('Email is already registered.');
      } else {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await user.sendEmailVerification();
        setSignupMessage('Verification email sent. Please check your email and verify your account.');

        // Wait for the user to verify their email
        const intervalId = setInterval(async () => {
          const user = auth.currentUser;
          if (user && user.emailVerified) {
            clearInterval(intervalId); // Stop checking for email verification
            setSignupMessage('Signup successful. Redirecting to login page...');
            setTimeout(() => {
              history('/'); // Redirect to the login page after successful signup
            }, 2000); // Wait for 2 seconds before redirecting
          }
        }, 1000); // Check every second for email verification
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const checkEmailExists = async (email) => {
    const snapshot = await database.ref('users').orderByChild('email').equalTo(email).once('value');
    return snapshot.exists();
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
      {signupMessage && <p className="signup-message">{signupMessage}</p>}
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Signup;

