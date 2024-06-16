import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper } from "@mui/material";
import ReactPlayer from "react-player";
import useAxios from '../utils/useAxios';
import { Card, CardMedia, Divider, Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";
import '../styles/css/video.css'

export default function TopicView() {
    const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

    const { id } = useParams();
    const api = useAxios();
    const token = localStorage.getItem("authTokens");

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get(baseUrl + `/tutorials/posts/${id}/`)
            .then((response) => {
                setTopics(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching tutorials:", error);
            });
    }, [id]);

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await axios.get(baseUrl + `/tutorials/${id}/comments/`);
                setComments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [id]);

    const [content, setContent] = useState("");

    const handleChange = (e) => {
        setContent(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(baseUrl + `/tutorials/${id}/comment/create/`, {
                content: content
            });
            console.log("Comment posted successfully:", response.data);
            // Reset form field after successful submission
            setContent("");
            // Update the comments state to display the newly posted comment
            setComments([...comments, response.data]); // Add the new comment to the existing comments array
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };


    return (
        <div>
            <Base>
                <div>
                    <Paper style={{ margin: 20, backgroundColor: "snow" }}>
                        <h2 style={{ textAlign: "center" }}>{topics.post_title}</h2>
                    </Paper>



                    <center>
                        <ReactPlayer
                            url={topics.post_video}
                            className="react-player"
                            width="50%"
                            controls={true}
                        />
                    </center>

                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
                        crossorigin="anonymous"></script>
                    <ins class="adsbygoogle"
                        style={{display:"block",textAlign:"center"}}
                        data-ad-layout="in-article"
                        data-ad-format="fluid"
                        data-ad-client="ca-pub-6919135852803356"
                        data-ad-slot="9140112864"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>

                    <Paper style={{ margin: 20, backgroundColor: "snow", padding: 20 }}>
                        <p dangerouslySetInnerHTML={{ __html: topics.post_content }}></p>
                    </Paper>
                </div>

                <div className="m-5">
                    <h2 style={{ textAlign: "center", color: "green" }}>Comments:</h2>
                    <ul>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <Paper style={{ padding: 20, margin: 20 }}>
                                    <h6 className="text-dark">{comment.content}</h6>
                                    <Divider />
                                    <h6>
                                        Posted by:-{" "}
                                        <span style={{ color: "red" }}>
                                            {comment.user.username}
                                        </span>
                                    </h6>
                                </Paper>
                                <Divider />
                            </div>
                        ))}
                    </ul>



                    {token ? (
                        <div>
                            <h2>Post a Comment</h2>
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
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Post Comment
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <p>
                                Please <a href="/login">login</a> to post a comment.
                            </p>
                        </div>
                    )}
                </div>
            </Base>
        </div>
    )
}