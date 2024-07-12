import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Base from "../components/Base";
import { Card, CardMedia, Divider, Paper, Typography } from "@mui/material";
import { TextField, Button } from "@mui/material";
import useAxios from "../utils/useAxios";

const SingleBlog = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const api = useAxios();
  const { url } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blogs/${url}/`);
        setPost(response.data);
        console.log("Blog post data:", response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchPost();
  }, [url]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blogs/${url}/comments/`);
        setComments(response.data);
        console.log("Comments data:", response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [url]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`${baseUrl}/blogs/${url}/comment/create/`, {
        content: content,
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
        <div className="m-5">
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6919135852803356"
            crossOrigin="anonymous"></script>
          <ins className="adsbygoogle"
            style={{ display: "block", textAlign: "center" }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-6919135852803356"
            data-ad-slot="9140112864"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          {post ? (
            <div>
              <Paper>
                <center>
                  <h4 className="text-danger p-2">
                    <span className="text-primary">Blog written by :- </span>
                    <span className="text-danger">
                      {post.user ? post.user.username : "Unknown"}
                    </span>
                  </h4>
                  <h6>
                    Email the Author :- {post.user ? post.user.email : "Not available"}
                  </h6>
                </center>
              </Paper>
              <Divider />
              <Typography
                variant="h4"
                style={{
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                {post.title}
              </Typography>
              <Divider />
              {post.image && (
                <Card>
                  <CardMedia component="img" image={post.image} />
                </Card>
              )}
              <Typography
                style={{ color: "black", paddingTop: 10 }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ) : (
            <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
              Loading...
            </Typography>
          )}
        </div>

        <div className="m-5">
          <h2 style={{ textAlign: "center", color: "green" }}>Comments:</h2>
          <ul>
            {comments.map((comment) => (
              <div key={comment.id}>
                <Paper style={{ padding: 20, margin: 20 }}>
                  <h4 className="text-dark">{comment.content}</h4>
                  <h6>
                    Posted by:-{" "}
                    <span style={{ color: "red" }}>
                      {comment.user ? comment.user.username : "Unknown"}
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
  );
};

export default SingleBlog;
