import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Typography, CardMedia } from "@mui/material";
import { toastErrorNotify, toastSuccessNotify } from "../utils/toastNotify";

import { BlogContext } from "../context/BlogContextProvider";

import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../component/BlogForm";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { editBlog, getOneBlog } = useContext(BlogContext);
  const params = useParams();
  const item = getOneBlog(params.id);

  const [updateBlog, setUpdateBlog] = useState(item?.length>0 && item[0]);

  useEffect(() => {
    setUpdateBlog(item?.length>0 && item[0]);
  }, [item]);

  const handler = (updateBlog) => {
    try {
      editBlog(updateBlog);
      navigate("/");
      toastSuccessNotify("Blog update successfully!");
    } catch (error) {
      toastErrorNotify("Blog can not be update");
    }
  };
  return (
    <Container className="login-container" style={{ height: "100vh" }}>
      <Box className="login-box">
        <CardMedia
          sx={{ objectFit:"contain", margin: "auto" }}
          component="img"
          image={item?.length>0 && item[0].imgUrl}
          alt="img"
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{ m: 4, fontFamily: "Girassol", color: "#046582" }}
        >
          ── UPPDATE BLOG ──
        </Typography>

        {item?.length > 0 && <BlogForm update={updateBlog} handler={handler} />}
      </Box>
    </Container>
  );
};

export default UpdateBlog;
