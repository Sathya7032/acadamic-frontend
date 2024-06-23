import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const swal = require('sweetalert2');

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // CSRF token state
  const [csrfToken, setCsrfToken] = useState('');

  // Function to get CSRF token from cookies
  const getCSRFTokenFromCookies = () => {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(cookie => {
        const cookieItem = cookie.trim();
        if (cookieItem.startsWith('csrftoken=')) {
          csrfToken = cookieItem.substring('csrftoken='.length);
        }
      });
    }
    return csrfToken;
  };

  // Use useEffect to fetch CSRF token on component mount
  useEffect(() => {
    setCsrfToken(getCSRFTokenFromCookies());
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'https://acadamicfolios.pythonanywhere.com/user_password_change/',
        {
          old_password: oldPassword,
          new_password: newPassword
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem('access') }`
          },
          withCredentials: true  // Ensure cookies are sent with the request
        }
      );

      if (response.status === 200) {
        setMessage('Password changed successfully.');
        swal.fire({
          title: "Password changed successfully",
          icon: "success",
          toast: true,
          timer: 6000,
          position: 'center',
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate("/dashboard");
      } else {
        setMessage('Failed to change password. Please try again.');
      }
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
      swal.fire({
        title: "There was an error changing password",
        icon: "error",
        toast: true,
        timer: 6000,
        position: 'center',
        timerProgressBar: true,
        showConfirmButton: false,
      });
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
