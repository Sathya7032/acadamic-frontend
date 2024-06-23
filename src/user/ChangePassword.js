import React, { useState } from 'react';
import axios from 'axios';
const swal = require('sweetalert2')
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://acadamicfolios.pythonanywhere.com/user_password_change/', {
        old_password: oldPassword,
        new_password: newPassword
      });
      
      if (response.status === 200) {
        setMessage('Password changed successfully.');
        history("/dashboard")
        swal.fire({
            title: "Password changed successfully",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'center',
            timerProgressBar: true,
            showConfirmButton: false,
        })
      } else {
        setMessage('Failed to change password. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + error.response.data.message || error.message);
      swal.fire({
        title: "There was an error changing password",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'center',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
