// src/components/PasswordReset.js
import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://acadamicfolios.pythonanywhere.com/auth/password/reset/', { email });
      setMessage('Password reset link sent. Please check your email.');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordReset;
