import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";

import {  AuthContext, useAuth } from "../context/AuthContextProvider";


export default function Profile() {
  const { currentUser } = useAuth(AuthContext);
  console.log(currentUser);
  return (
  <Container sx={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center" ,mt:3}} >
      <Card sx={{ minWidth: 500 ,maxWidth:500}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={currentUser?.photoURL}
            alt="user photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Display Name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.displayName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
}
