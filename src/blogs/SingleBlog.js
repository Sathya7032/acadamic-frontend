import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Base from "../components/Base";
import { Paper, Typography, Divider, Button } from "@mui/material";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useAxios from "../utils/useAxios";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SingleBlog = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const api = useAxios();
  const { url } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${baseUrl}/blogs/${url}`);
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

  const handleChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
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
    <div style={{ margin: 0, padding: 0 }}>
      <Base>
        <div style={{ padding: isMobile ? '10px' : '20px' }}>
          {post ? (
            <div>
              <Typography
                variant={isMobile ? "h6" : "h4"}
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
              <Typography
                style={{
                  color: "black",
                  paddingTop: 10,
                  fontSize: isMobile ? '14px' : 'inherit'
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <Divider />
              <Paper style={{ padding: isMobile ? '10px' : '20px' }}>
                <center>
                  <h5 className="text-danger p-2" style={{ fontSize: isMobile ? '16px' : 'inherit' }}>
                    <span className="text-primary">Blog written by: </span>
                    <span className="text-danger">
                      {post.user ? post.user.username : "Unknown"}
                    </span>
                  </h5>
                </center>
              </Paper>
            </div>
          ) : (
            <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
              Loading...
            </Typography>
          )}
        </div>

        <div style={{ padding: isMobile ? '10px' : '20px' }}>
          <h2 style={{ textAlign: "center", color: "green", fontSize: isMobile ? '18px' : 'inherit' }}>Comments:</h2>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id}>
                  <Paper style={{ padding: isMobile ? '10px' : '20px', margin: isMobile ? '10px' : '20px' }}>
                    <Typography
                      style={{
                        color: "black",
                        paddingTop: 10,
                        fontSize: isMobile ? '14px' : 'inherit'
                      }}
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                    <h6>
                      Posted by:{" "}
                      <span style={{ color: "red", fontSize: isMobile ? '14px' : 'inherit' }}>
                        {comment.user ? comment.user.username : "Unknown"}
                      </span>
                    </h6>
                  </Paper>
                  <Divider />
                </div>
              ))
            ) : (
              <Typography variant="h6" style={{ textAlign: "center", color: "red", fontSize: isMobile ? '16px' : 'inherit' }}>
                No comments yet. Be the first to comment!
              </Typography>
            )}
          </ul>

          {token ? (
            <div>
              <h2 style={{ fontSize: isMobile ? '18px' : 'inherit' }}>Post a Comment</h2>
              <form onSubmit={handleSubmit}>
                <CKEditor
                  editor={ClassicEditor}
                  data={content}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                  Post Comment
                </Button>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: isMobile ? '14px' : 'inherit' }}>
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
