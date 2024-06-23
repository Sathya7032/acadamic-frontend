import React, { useEffect, useState } from 'react'
import Base1 from "./Base1";
import { jwtDecode } from "jwt-decode";
import useAxios from '../utils/useAxios';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";

const Profile = () => {
    const token = localStorage.getItem("authTokens");
    const axiosInstance = useAxios();
    const baseUrl = "https://www.acadamicfolio.online/app";

    if (token) {
        const decode = jwtDecode(token);
        var user_id = decode.user_id;
        var username = decode.username;
       
    }

    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [role, setRole] = useState('');
    const [gitlink, setGitlink] = useState('');
    const [image, setImage] = useState('');


    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        await axiosInstance.get(baseUrl + "/api/profile/").then((res) => {
            console.log(res.data);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('https://www.acadamicfolio.online/app/profile-post/', {
                full_name: fullName,
                bio: bio,
                role: role,
                gitlink: gitlink,
                image: image
            });
            alert('Profile updated successfully!');
            Swal.fire({
                title: "Password changed successfully",
                icon: "success",
                toast: true,
                timer: 2000,
                timerProgressBar: true,
                position: 'center',
                showConfirmButton: false,
              });
              

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div>
            <Base1>
                <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
                    <Typography variant="h2" gutterBottom>Edit Profile</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="full_name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            variant="outlined"
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="GitHub Link"
                            name="gitlink"
                            value={gitlink}
                            onChange={(e) => setGitlink(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Image URL"
                            name="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            variant="outlined"
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </form>
                </Box>
            </Base1>

        </div>
    )
}

export default Profile
