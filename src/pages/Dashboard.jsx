import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { BlogContext } from "../context/BlogContextProvider";
import loadingGif from "../assets/loading.gif";

import BlogCard from "../component/BlogCard";
import { Container, Grid } from "@mui/material";

const Dashboard = () => {
  const { useData } = useContext(BlogContext);
  const { currentBlogs } = useData();

  return (
    <Container sx={{  minWidth:"100%" }} >
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        sx={{ fontFamily: "Girassol", textAlign: "center", color: "#046582" }}
      >
        ──── Dashboard ────
      </Typography>

        {currentBlogs === undefined ? (
          <img src={loadingGif} alt="loading" />
        ) : (
          <Container alignitems="center" justify="center"  sx={{minWidth:"100%" }} >
          <Grid
            container
      
          >
  
          {currentBlogs?.map((item, id) => (
            <Grid item  sm={12} md={6} lg={4} xl={3} key={id} >
              <BlogCard item={item}  />
            </Grid>
          ))}
          </Grid>
          </Container>
          )}
    
  </Container>
  )

};

export default Dashboard;
