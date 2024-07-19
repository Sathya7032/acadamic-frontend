import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Typography, Divider, TextField, Button } from "@mui/material";
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

    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

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
        <div>
            <Base>
                <div style={{ margin: isMobile ? 0 : 20, padding: isMobile ? '10px' : '40px' }}>
                    <Paper style={{ backgroundColor: "snow", padding: isMobile ? '10px' : '20px' }}>
                        <Typography
                            variant={isMobile ? "h6" : "h4"}
                            style={{ textAlign: "center", fontWeight: "bolder" }}
                        >
                            {topics.post_title}
                        </Typography>
                    </Paper>

                    <center>
                        <ReactPlayer
                            url={topics.post_video}
                            className="react-player"
                            width="100%"
                            controls={true}
                        />
                    </center>

                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                        crossorigin="anonymous"></script>
                    <ins className="adsbygoogle"
                        style={{ display: "block", textAlign: "center" }}
                        data-ad-layout="in-article"
                        data-ad-format="fluid"
                        data-ad-client="ca-pub-6919135852803356"
                        data-ad-slot="9140112864"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>

                    <Paper style={{ backgroundColor: "snow", padding: isMobile ? '10px' : '20px' }}>
                        <Typography
                            style={{ color: "black", fontSize: isMobile ? '14px' : 'inherit' }}
                            dangerouslySetInnerHTML={{ __html: topics.post_content }}
                        />
                    </Paper>
                </div>

                <div style={{ margin: isMobile ? 0 : 20, padding: isMobile ? '10px' : '40px' }}>
                    <Typography
                        variant={isMobile ? "h6" : "h4"}
                        style={{ textAlign: "center", color: "green" }}
                    >
                        Comments:
                    </Typography>
                    <ul>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <Paper style={{ padding: isMobile ? '10px' : '20px', margin: isMobile ? '10px' : '20px' }}>
                                    <Typography
                                        style={{ color: "black", fontSize: isMobile ? '14px' : 'inherit' }}
                                    >
                                        {comment.content}
                                    </Typography>
                                    <Divider />
                                    <Typography
                                        style={{ color: "red", fontSize: isMobile ? '14px' : 'inherit' }}
                                    >
                                        Posted by: {comment.user.username}
                                    </Typography>
                                </Paper>
                                <Divider />
                            </div>
                        ))}
                    </ul>

                    {token ? (
                        <div>
                            <Typography
                                variant={isMobile ? "h6" : "h4"}
                                style={{ textAlign: "center" }}
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
                                    style={{ fontSize: isMobile ? '14px' : 'inherit' }}
                                >
                                    Post Comment
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <Typography
                                style={{ fontSize: isMobile ? '14px' : 'inherit' }}
                            >
                                Please <a href="/login">login</a> to post a comment.
                            </Typography>
                        </div>
                    )}
                </div>
            </Base>
        </div>
    );
}
