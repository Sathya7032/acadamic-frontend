import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAxios from '../utils/useAxios';  // Ensure this path matches where your useAxios file is located
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const baseUrl = "https://acadamicfolios.pythonanywhere.com/";
  const api = useAxios();


  const handlePasswordChange = async () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    try {
      const response = await api.post(baseUrl + "auth/password/change/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard");
      Swal.fire({
        title: "You have added a new Blog.....",
        width: 400,
        timer: 2000,
        toast: true,
        timerProgressBar: true,
        padding: "3em",
        color: "#716add",
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
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
