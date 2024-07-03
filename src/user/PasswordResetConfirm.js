// src/components/PasswordResetConfirm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await axios.post('https://acadamicfolios.pythonanywhere.com/auth/password/reset/confirm/', {
        uid,
        token,
        new_password1: newPassword,
        new_password2: confirmPassword,
      });
      setMessage('Password has been reset successfully.');
      // Optionally, redirect to login page
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <div>
      <h2>Confirm Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
