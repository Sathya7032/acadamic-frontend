import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://acadamicfolios.pythonanywhere.com/auth/password/change/';
    const token = 'your_jwt_token_here';  // Replace with your actual JWT token

    const requestData = {
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.non_field_errors[0] || 'Failed to change password');
      }

      setSuccessMessage('Password changed successfully!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
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

export default ChangePasswordForm;
