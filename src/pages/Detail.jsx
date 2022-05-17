import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardMedia, Container } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Grid } from "@mui/material";
import { toastErrorNotify, toastSuccessNotify } from "../utils/toastNotify";
import moment from "moment";
import { useBlog } from "../context/BlogContextProvider";
import { AuthContext } from "../context/AuthContextProvider";
import Comment from "../component/Comment";
import Comments from "../component/Comments";

const Details = () => {
  const { deleteBlog, editBlog, getOneBlog } = useBlog();
  const location = useLocation();
  const id = location?.state?.id;
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const item = getOneBlog(id);

  const handleDelete = () => {
    deleteBlog(item[0]?.id);
    navigate("/");
    toastSuccessNotify("Deleted Successfully");
  };
  const handleLike = () => {
    if (
      !Object.keys(item[0].likeCount).includes(currentUser.uid) ||
      !Object.keys(item[0].likeCount).includes(currentUser.uid) ||
      item[0]?.open
    ) {
      editBlog({
        ...item[0],
        likeCount: { ...item[0].likeCount, [currentUser.uid]: 1 },
        open: false,
      });
    } else if (!currentUser) {
      navigate("/login");
      toastErrorNotify("Please Login to like this blog");
    } else {
      editBlog({
        ...item[0],
        likeCount: { ...item[0].likeCount, [currentUser.uid]: 0 },
        open: true,
      });
    }
  };
  return (
    <Container >
      {location?.state?.open && (
        <Typography
          gutterBottom
          variant="h3"
          component="div"
          sx={{ fontFamily: "Girassol", textAlign: "center", color: "#046582" }}
        >
          ──── Details ────
        </Typography>
      )}
      {location?.state?.open && (
        <Card sx={{ m: 9, cursor: "pointer" ,border:3}} key={item[0]?.id}>
          <CardMedia
            sx={{ width: "auto", height: "50vh", margin: "auto" }}
            component="img"
            image={item[0]?.imgUrl}
            alt="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item[0]?.title}
            </Typography>
            <Typography>
              {moment(item[0]?.addDate).format("MM/DD/YYYY")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item[0]?.content}
            </Typography>
          </CardContent>
          <Typography gutterBottom sx={{ ml: 2 }} variant="h5">
            <AccountCircleIcon
              style={{ position: "relative", top: "5px", fontSize: "30px" }}
            />{" "}
            {item[0]?.user}
          </Typography>
          <CardActions>
            <Button size="small" onClick={handleLike}>
              <FavoriteIcon
                style={{
                  marginRight: "7px",
                  color: item[0].likeCount[currentUser.uid] ? "red" : "gray",
                }}
              />
              {Object.values(item[0].likeCount).reduce((a, b) => a + b, 0)}
            </Button>
            <Comment item={item[0]} />
            <Typography sx={{ fontSize: 20 }}>
              {Object.keys(item[0].comments).length}
            </Typography>
          </CardActions>
          {item[0]?.user === currentUser?.email && (
            <Container
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <Grid item xs={12}>
                <Button
                  style={{
                    backgroundColor: "#046582",
                    fontWeight: 700,
                    fontSize: "1rem",
                    width: "200px",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => navigate(`/update-blog/${item[0]?.id}`)}
                >
                  Update
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    width: "200px",
                  }}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={() => handleDelete(item[0]?.id)}
                >
                  Delete
                </Button>
              </Grid>
            </Container>
          )}
          <Comments item={item[0]}/>
        </Card>
      )}
    </Container>
  );
};
export default Details;
