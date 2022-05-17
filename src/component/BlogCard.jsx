import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toastErrorNotify } from "../utils/toastNotify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import moment from "moment";
import placeholder from "../assets/placeholder.png";
import { ExpandMore } from "@mui/icons-material";
import { BlogContext } from "../context/BlogContextProvider";
import Detail from "../pages/Detail";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Comment from "./Comment";
const BlogCard = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const { title, imgUrl, content, user, addDate, likeCount } = item;
  const { editBlog, getOneBlog } = useContext(BlogContext);
  const navigate = useNavigate();
  const blog = getOneBlog(item?.id);

  const handleLike = () => {
    if (!currentUser) {
      navigate("/login");
      toastErrorNotify("Please Login to like this blog");
    } else if (
      !Object.keys(blog[0].likeCount).includes(currentUser.uid) ||
      !Object.keys(blog[0].likeCount).includes(currentUser.uid) ||
      blog[0]?.open
    ) {
      editBlog({
        ...blog[0],
        likeCount: { ...likeCount, [currentUser.uid]: 1 },
        open: false,
      });
    } else {
      editBlog({
        ...blog[0],
        likeCount: { ...likeCount, [currentUser.uid]: 0 },
        open: true,
      });
    }
  };

  const openDetails = () => {
    if (!currentUser) {
      toastErrorNotify("Please Login to get the details");
    }
    navigate(`/detail/`, { state: { ...item, open: true } });
  };

  return (
    <Card sx={{ minWidth: 345, maxWidth: 345, m: 1, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="194"
        image={imgUrl || placeholder}
        alt="image"
        title={title}
        sx={{
          objectFit: "contain",
          minWidth: 340,
          maxWidth: 340,
          margin: "auto",
          height: "194px",
        }}
      />
      <CardContent>
        <Typography
          variant="h5"
          color="#046582"
          sx={{ fontFamily: "Girassol", textAlign: "left" }}
        >
          {title}
        </Typography>
        <Typography>{moment(addDate).format("MM/DD/YYYY")}</Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 340, height: 50 }}
        >
          {content.substring(0, 100)}...
        </Typography>
      </CardContent>
      <Typography>
        <AccountCircleIcon />
        {user}
      </Typography>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon
            style={{
              marginRight: "7px",
              color: likeCount[currentUser.uid] ? "red" : "gray",
            }}
          />
        </IconButton>
        <Typography sx={{ fontSize: 20 }}>
          {Object.values(blog[0].likeCount).reduce((a, b) => a + b, 0)}
        </Typography>

        <Comment item={item} />
        <Typography sx={{ fontSize: 20 }}>
          {Object.keys(blog[0].comments).length}
        </Typography>

        <Typography
          variant="h5"
          color="#046582"
          sx={{ fontFamily: "Girassol", ml: 11 }}
        >
          Detail
        </Typography>
        <ExpandMore onClick={openDetails} sx={{ cursor: "pointer" }}>
          <ExpandMoreIcon />
        </ExpandMore>
        <Detail />
      </CardActions>
    </Card>
  );
};

export default BlogCard;
