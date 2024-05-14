import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Base from "../components/Base";
import { Card, CardMedia, Divider, Paper, Typography } from "@mui/material";
import { TextField, Button} from "@mui/material";
import useAxios from "../utils/useAxios";


const SingleBlog = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";

  const api = useAxios();

  const { slug } = useParams();

  const [post, setPost] = useState([]);

  const token = localStorage.getItem("authTokens");

  

  useEffect(() => {
    axios
      .get(baseUrl + `/blogs/?slug=${slug}/`)
      .then((response) => {
        setPost(response.data);
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
        const response = await axios.get(baseUrl + `/blogs/?slug=${slug}/comments/`);
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
      const response = await api.post(baseUrl + `/blog/${post.slug}/comment/create/`, {
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
        <div className="m-5">
          {post.map((posts) => (
            <div key={posts.id}>
              <Paper>
                <center>
                  <h4 className="text-danger p-2">
                    <span className="text-primary">Blog written by :- </span>
                    <span className="text-danger">{posts.user.username}</span>
                  </h4>
                  <h6>Email the Author :- {posts.user.email}</h6>
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
                {posts.title}
              </Typography>
              <Divider />
              <Card>
                <CardMedia component="img" image={posts.image} />
              </Card>
              <Typography
                style={{ color: "black", paddingTop: 10 }}
                dangerouslySetInnerHTML={{ __html: posts.content }}
              ></Typography>

              {posts.comment}
            </div>
          ))}
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
  );
};

export default SingleBlog;
