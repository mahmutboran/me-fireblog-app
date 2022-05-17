import  { useContext } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { toastErrorNotify, toastSuccessNotify } from "../utils/toastNotify";
import blogPng from "../assets/blok.png";
import { BlogContext } from "../context/BlogContextProvider";

import { useNavigate } from "react-router-dom";
import BlogForm from "../component/BlogForm";

const NewBlog = () => {
  const navigate = useNavigate();

  const { addBlog } = useContext(BlogContext);

  const handler = (newBlog) => {
    try {
      addBlog(newBlog);
      navigate("/");
      toastSuccessNotify("Blog added successfully!");
    } catch (error) {
      toastErrorNotify("Blog can not be added");
    }
  };

 
  return (
    <Container className="login-container" style={{ height: "100vh" }}>
      <Box className="login-box">
        <Avatar
          className="login-avatar"
          alt="avatar_img"
          src={blogPng}
          sx={{ width: 156, height: 156 }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{ m: 4, fontFamily: "Girassol", color: "#046582" }}
        >
          ── NEW BLOG ──
        </Typography>
        <BlogForm handler={handler} />
      </Box>
    </Container>
  );
};

export default NewBlog;
