import React, { useState } from 'react';
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import useAxios from '../utils/useAxios';  // Adjust the path as per your file structure

const ChangePasswordComponent = () => {
  const axiosInstance = useAxios();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
    
      const response = await axiosInstance.post('https://acadamicfolios.pythonanywhere.com/auth/password/change/', {
        old_password: oldPassword,
        new_password1: newPassword1,
        new_password2: newPassword2
      });

      // Handle successful password change
      setSuccessMessage('Password changed successfully!');
      setError(null);

    } catch (error) {
      console.error('Failed to change password:', error);
      setError('Failed to change password. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
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
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordComponent;
