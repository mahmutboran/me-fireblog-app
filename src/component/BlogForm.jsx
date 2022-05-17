import React, { useContext, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContextProvider";

const BlogForm = ({ handler,update }) => {

    const {currentUser} = useContext(AuthContext);
    const [posts, setPosts] = useState(update?.title  ? update : {
        title: "",
        content: "",
        imgUrl: "",
        user: currentUser?.email,
        addDate: new Date(),
        likeCount: {[currentUser?.uid]:0},
        commentCount: 0,
        comments:{comment:""},
        open:true
    
      }  );

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPosts({ ...posts, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handler(posts);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            name="title"
            variant="outlined"
            type="text"
            autoFocus
            autoComplete="title"
            required
            value={posts?.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="imgUrl"
            label="Image URL"
            name="imgUrl"
            variant="outlined"
            type="text"
            autoComplete="image-url"
            required
            value={posts?.imgUrl}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="content"
            label="Content"
            name="content"
            multiline
            variant="outlined"
            type="text"
            rows={10}
            autoFocus
            autoComplete="content"
            required
            value={posts?.content}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{ backgroundColor: "#046582", fontWeight: 700 }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            {posts?.id ? "Update Blog" : "Add Blog"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BlogForm;
