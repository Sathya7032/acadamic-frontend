import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Typography, Divider, TextField, Button, List, ListItemButton, ListItemText } from "@mui/material";
import ReactPlayer from "react-player";
import useAxios from '../utils/useAxios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../styles/css/video.css';

export default function TopicView() {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
    const { url } = useParams();
    const api = useAxios();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const token = localStorage.getItem("authTokens");

    const [topics, setTopics] = useState({});
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [tutorials, setTutorials] = useState([]);


    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        await axios.get(baseUrl + "/tutorials/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            setTutorials(res.data);
        });
    };


    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/posts/${url}/`)
            .then((response) => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
    }, [url]);

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.get(baseUrl + `/tutorials/${url}/comments/`);
                setComments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [url]);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(baseUrl + `/tutorials/${url}/comment/create/`, {
                content: content
            });
            console.log("Comment posted successfully:", response.data);
            setContent("");
            setComments([...comments, response.data]);
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };



    return (
        <Base>
            <Grid container style={{ margin: isMobile ? 0 : 0, padding: isMobile ? '10px' : '0px' }}>
                {/* Grid for All Topics */}
                <Grid item xs={12} md={2}>
                    <Divider/>
                    <Typography variant="h6" style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}>
                        Tutorials
                    </Typography>
                    <List>
                        {tutorials.map((tut) => (
                            <>
                                <Divider />
                                <ListItemButton key={tut.url} href={`/tutorials/${tut.url}`}>
                                    <ListItemText primary={tut.tutorialName} />
                                </ListItemButton>
                                <Divider />
                            </>
                        ))}

                    </List>
                </Grid>

                {/* Grid for Main Content */}
                <Grid item xs={12} md={10}>
                    <Paper style={{ backgroundColor: "snow", padding: isMobile ? '10px' : '20px', marginBottom: 20 }}>
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            style={{ textAlign: "center", fontWeight: "bolder" }}
                        >
                            {topics.post_title || "Loading..."}
                        </Typography>
                    </Paper>

                    {topics.post_video && (
                        <center style={{ marginBottom: 20 }}>
                            <ReactPlayer
                                url={topics.post_video}
                                className="react-player"
                                width="100%"
                                controls={true}
                            />
                        </center>
                    )}

                    <Paper style={{ backgroundColor: "snow", padding: isMobile ? '10px' : '20px', marginBottom: 20 }}>
                        <Typography
                            style={{ color: "black", fontSize: isMobile ? '14px' : 'inherit' }}
                            dangerouslySetInnerHTML={{ __html: topics.post_content || "Content not available." }}
                        />
                    </Paper>

                    <Typography
                        variant={isMobile ? "h6" : "h4"}
                        style={{ textAlign: "center", color: "green", marginBottom: 20 }}
                    >
                        Comments:
                    </Typography>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <Paper key={comment.id} style={{ padding: isMobile ? '10px' : '20px', marginBottom: 20 }}>
                                <Typography
                                    style={{ color: "black", fontSize: isMobile ? '14px' : 'inherit' }}
                                >
                                    {comment.content}
                                </Typography>
                                <Divider />
                                <Typography
                                    style={{ color: "red", fontSize: isMobile ? '10px' : '12px', marginTop: 10 }}
                                >
                                    Posted by: {comment.user.username}
                                </Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography style={{ textAlign: "center", color: "gray" }}>
                            No comments yet.
                        </Typography>
                    )}

                    {token ? (
                        <div style={{ marginTop: 20 }}>
                            <Typography
                                variant={isMobile ? "h6" : "h4"}
                                style={{ textAlign: "center", marginBottom: 20 }}
                            >
                                Post a Comment
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Comment"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={content}
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        style: { fontSize: isMobile ? '14px' : 'inherit' }
                                    }}
                                    InputLabelProps={{
                                        style: { fontSize: isMobile ? '14px' : 'inherit' }
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ fontSize: isMobile ? '14px' : 'inherit', marginTop: 10 }}
                                >
                                    Post Comment
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <Typography
                            style={{ fontSize: isMobile ? '14px' : 'inherit', textAlign: "center", marginTop: 20 }}
                        >
                            Please <a href="/login">login</a> to post a comment.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Base>
    );
}
