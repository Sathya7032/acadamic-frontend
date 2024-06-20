import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const Profile = () => {
    const [profiles, setProfiles] = useState([]);
    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        role: '',
        gitlink: '',
    });

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await axios.get('https://acadamicfolios.pythonanywhere.com/app/profiles/');
            setProfiles(response.data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://acadamicfolios.pythonanywhere.com/app/profiles/', formData);
            setProfiles([...profiles, response.data]);
            setFormData({ full_name: '', bio: '', role: '', gitlink: '' }); // Clear form after submission
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/profiles/${id}/`);
            setProfiles(profiles.filter(profile => profile.id !== id));
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Profile Management</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Git Link"
                            name="gitlink"
                            value={formData.gitlink}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Create Profile</Button>
                    </Grid>
                </Grid>
            </form>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                {profiles.map(profile => (
                    <Grid item key={profile.id} xs={12} sm={6} md={4}>
                        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
                            <Typography variant="h6">{profile.full_name}</Typography>
                            <Typography variant="body2">{profile.bio}</Typography>
                            <Typography variant="body2">{profile.role}</Typography>
                            <Typography variant="body2"><a href={profile.gitlink} target="_blank" rel="noopener noreferrer">{profile.gitlink}</a></Typography>
                            <Button variant="outlined" color="secondary" onClick={() => handleDelete(profile.id)}>Delete</Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Profile;
